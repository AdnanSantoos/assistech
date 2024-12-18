import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GerenciadorDiarioOficialService } from './service/gerenciador-diario-oficial.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { DiarioOficialPublicacoes, StatusPublicacao } from './models/gerenciador-diario-oficial.model';
import { TenantService } from '../../../../shared/services/tenant.service';
import { subscribe } from 'diagnostics_channel';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gerenciador-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, TooltipModule, ModalModule],
  providers: [BsModalService],
  templateUrl: './gerenciador-diario-oficial-administrativo.component.html',
  styleUrls: ['./gerenciador-diario-oficial-administrativo.component.scss'],
})
export class GerenciadorDiarioOficialAdministrativoComponent implements OnInit {
  public documents: DiarioOficialPublicacoes[] = [];
  public selectedDocument: DiarioOficialPublicacoes | null = null;
  public modalRef?: BsModalRef;

  public currentPage = 1;
  public totalPages = 5;
  public isStaff: boolean | null = null;

  public documentPages: number[] = []; // Lista de páginas do documento selecionado 
  public selectedPages: number[] = []; // Páginas selecionadas para exclusão
  selectedFile: File | null = null; // Armazena o arquivo selecionado
  public publicacoes: DiarioOficialPublicacoes[] = [];

  constructor(
    private _location: Location,
    private _service: GerenciadorDiarioOficialService,
    private dialog: MatDialog,
    public tenantService: TenantService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {
    this._service.publicacoes$.subscribe((data) => {
      this.publicacoes = data;
    });
  }
  loadPublicacoes(page: number): void {
    this._service.loadPublicacoes(page);
    this.currentPage = page;
  }
  ngOnInit(): void {
    this.isStaff = this.tenantService.getStaff();

    // Assina o Observable para atualizar os documentos em tempo real
    this._service.publicacoes$.subscribe({
      next: (data) => {
        this.documents = data; // Atualiza os documentos
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      error: (err) => {
        console.error('Erro ao atualizar os documentos:', err);
      },
    });


    // Carrega a primeira página
    this.getDiario(this.currentPage);
  }


  statusPublicacao(status: string): string {
    const traducoes: Record<string, string> = {
      [StatusPublicacao.PENDING]: 'Pendente',
      [StatusPublicacao.GENERATED_INDEX]: 'Índice Gerado',
      [StatusPublicacao.GENERATED_PDF]: 'PDF Gerado',
      [StatusPublicacao.SIGNED_PDF]: 'PDF Assinado',
      [StatusPublicacao.JOINING_FILES]: 'Unindo Arquivos',
      [StatusPublicacao.ERROR]: 'Erro',
      [StatusPublicacao.PUBLISHED]: 'Publicado',
      [StatusPublicacao.SCHEDULED]: 'Agendado'
    };

    return traducoes[status] || '-';
  }

  getDiario(page: number): void {
    this._service.loadPublicacoes(page); // Carrega os dados e atualiza o BehaviorSubject
    this._service.getDashboard(page).subscribe({
      next: (res) => {
        this.currentPage = res.meta?.pagination.current_page || 1;
        this.totalPages = res.meta?.pagination.last_page || 1;
      },
      error: (err) => {
        console.error('Erro ao carregar o Diário Oficial:', err);
      }
    });
  }

  goBack(): void {
    this._location.back();
  }

  goToPage(page: number) {
    this.getDiario(page);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDiario(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getDiario(this.currentPage);
    }
  }
  openConfirmationModal(template: any, document: DiarioOficialPublicacoes): void {
    this.selectedDocument = document;
    this.modalRef = this.modalService.show(template);
  }


  confirmDelete(): void {
    if (this.selectedDocument) {
      this._service.onDeleteItem(this.selectedDocument.id).subscribe({
        next: () => {
          console.log('Documento excluído com sucesso!');
          this.getDiario(this.currentPage);
          this.cdr.detectChanges(); // Força atualização do template
          this.modalService.hide();
        },
        error: (err) => {
          console.error('Erro ao excluir documento:', err);
          this.modalService.hide();
        },
      });
    }
  }
  

  openDeletePage(template: any, document: DiarioOficialPublicacoes): void {
    this.selectedDocument = document;
    this.selectedPages = [];

    if (document.id) {
      this._service.getDocumentPages(document.id).subscribe({
        next: (response) => {

          if (response.data.pages) {
            this.documentPages = Array.from({ length: response.data.pages }, (_, i) => i + 1);
          } else {
            this.documentPages = [];
          }
        },
        error: (err) => {
          console.error('Erro ao carregar as páginas do documento:', err);
          this.documentPages = [];
        },
      });
    }
    this.modalRef = this.modalService.show(template);
  }

  togglePageSelection(page: number): void {
    const index = this.selectedPages.indexOf(page);
    if (index === -1) {
      this.selectedPages.push(page);
    } else {
      this.selectedPages.splice(index, 1);
    }
  }

  confirmDeletePage(): void {
    if (this.selectedDocument && this.selectedPages.length > 0) {
      console.log('Excluindo páginas:', this.selectedPages);
      this._service.onDeletePages(this.selectedDocument.id, this.selectedPages).subscribe({
        next: () => {
          console.log('Páginas excluídas com sucesso!');
          this.modalRef?.hide();
          this.selectedPages = [];
          this.getDiario(this.currentPage);
        },
        error: (err) => {
          console.error('Erro ao excluir páginas:', err);
        },
      });
    }
  }


  getDocumentPages(document: DiarioOficialPublicacoes): number[] {
    // Simulação: cada documento tem 10 páginas por padrão
    return Array.from({ length: 10 }, (_, i) => i + 1);
  }

  viewCurrentFile(): void {
    if (this.selectedDocument) {
      window.open(this.selectedDocument.file_upload, '_blank');
    }
  }

  previewFile(): void {
    if (this.selectedDocument) {
      window.open(this.selectedDocument.file_published || this.selectedDocument.file_upload, '_blank');
    }
  }

  openAnexarModal(template: any, document: DiarioOficialPublicacoes): void {
    this.selectedDocument = document; // Define o documento selecionado
    this.modalRef = this.modalService.show(template); // Abre o modal
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0]; // Salva o arquivo selecionado
      console.log('Arquivo selecionado:', this.selectedFile); // Log do arquivo selecionado
    }
  }

  attachDocument(): void {
    if (this.selectedDocument && this.selectedFile) {
      console.log('Enviando arquivo:', this.selectedFile); // Log do envio
      this._service.attachDocument(this.selectedDocument.id, this.selectedFile).subscribe({
        next: (response) => {
          if (response.data.status) {
            console.log('Documento anexado com sucesso!');
            this.modalRef?.hide(); // Fecha o modal
            this.selectedFile = null; // Reseta o arquivo selecionado
          }
        },
        error: (err) => {
          console.error('Erro ao anexar o documento:', err);
        },
      });
    } else {
      console.warn('Nenhum arquivo selecionado ou documento inválido.');
    }
  }
}
