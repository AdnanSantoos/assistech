import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GerenciadorDiarioOficialService } from './service/gerenciador-diario-oficial.service';
import {
  DiarioOficialPublicacoes,
  StatusPublicacao,
} from './models/gerenciador-diario-oficial.model';
import { TenantService } from '../../../../shared/services/tenant.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { WebSocketService } from '../../../../shared/services/web-socket.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-gerenciador-diario-oficial-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIcon,
    TooltipModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  providers: [BsModalService],
  templateUrl: './gerenciador-diario-oficial-administrativo.component.html',
  styleUrls: ['./gerenciador-diario-oficial-administrativo.component.scss'],
})
export class GerenciadorDiarioOficialAdministrativoComponent
  implements OnInit, OnDestroy
{
  public documents: DiarioOficialPublicacoes[] = [];
  public selectedDocument: DiarioOficialPublicacoes | null = null;
  public modalRef?: BsModalRef;
  anexarForm!: FormGroup;
  editarForm!: FormGroup;

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
    private webSocketService: WebSocketService,
    public tenantService: TenantService,
    private modalService: BsModalService,
    private _tenantService: TenantService,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this._service.publicacoes$.subscribe((data) => {
      this.publicacoes = data;
    });
    this.anexarForm = this.fb.group({
      file: ['', [Validators.required]],
      signature_date: [null],
    });

    this.editarForm = this.fb.group({
      description: ['', [Validators.required]],
      reprocess: ['no', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
  loadPublicacoes(page: number): void {
    this._service.loadPublicacoes(page);
    this.currentPage = page;
  }
  ngOnInit(): void {
    this.isStaff = this.tenantService.getStaff();
    this._service.loadPublicacoes(this.currentPage);

    const token = localStorage.getItem('authToken')!;
    const tenant = this._tenantService.getTenant()!;

    const echo = this.webSocketService.initializeWebSocket(token, tenant);

    const channelName = `official_gazette.${tenant}`; // Canal privado
    console.log({ channelName });

    // Escutando o evento do WebSocket
    echo
      .private(channelName)
      .listen('.OfficialGazetteProcessed', (event: any) => {
        console.log({ event });
        this.updatePublicationStatus(event); // Atualiza o status da publicação
      })
      .error((error: any) => {
        console.error('Erro ao escutar o canal:', error);
      });

    this._service.publicacoes$.subscribe((publicacoes) => {
      this.publicacoes = publicacoes.map((doc) => {
        // Manter o nome original ou usar o que está salvo no localStorage
        const savedFileName = localStorage.getItem(`doc_${doc.id}_filename`);
        if (savedFileName && !doc.file_name) {
          return { ...doc, file_name: savedFileName };
        }
        return doc;
      });
    });
  }

  /**
   * Atualiza o status da publicação com base no evento recebido.
   * @param event Dados do evento.
   */
  private updatePublicationStatus(event: any): void {
    const { official_gazette_id, status, file_published } = event;
    // Procure a publicação na lista e atualize seu status
    const publication = this.publicacoes.find(
      (pub) => pub.id === official_gazette_id
    );
    if (publication) {
      publication.status = status;
      publication.file_published = file_published;
    } else {
      console.warn('Publicação não encontrada', event);
    }
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
      [StatusPublicacao.SCHEDULED]: 'Agendado',
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
      },
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
  openConfirmationModal(
    template: any,
    document: DiarioOficialPublicacoes
  ): void {
    this.selectedDocument = document;
    this.modalRef = this.modalService.show(template);
    this.editarForm.controls['description'].setValue(
      this.selectedDocument.description
    );
  }

  confirmDelete(): void {
    if (this.selectedDocument) {
      this._service.onDeleteItem(this.selectedDocument.id).subscribe({
        next: () => {
          this.getDiario(this.currentPage);
          this.modalService.hide();
        },
        error: (err) => {
          this.modalService.hide();
        },
      });
    }
  }

  editar(): void {
    if (this.selectedDocument) {
      this._service
        .edit(this.selectedDocument.id, this.editarForm.value)
        .subscribe({
          next: () => {
            this.getDiario(this.currentPage);
            this.modalService.hide();
          },
          error: (err) => {
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
            this.documentPages = Array.from(
              { length: response.data.pages },
              (_, i) => i + 1
            );
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
      this._service
        .onDeletePages(this.selectedDocument.id, this.selectedPages)
        .subscribe({
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
      window.open(
        this.selectedDocument.file_published ||
          this.selectedDocument.file_upload,
        '_blank'
      );
    }
  }

  openAnexarModal(template: any, document: DiarioOficialPublicacoes): void {
    this.selectedDocument = document; // Define o documento selecionado
    this.modalRef = this.modalService.show(template); // Abre o modal
  }
  getFirstFileName(fileName: string): string {
    if (!fileName) return '';
    // Se o arquivo tiver múltiplos nomes separados por vírgula ou ponto e vírgula
    const fileNames = fileName.split(/[,;]/).map((name) => name.trim());
    return fileNames[0]?.split(' ')[0] || '';
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.anexarForm.patchValue({
        file: file,
      });
    } else {
      this.selectedFile = null;
      this.anexarForm.patchValue({
        file: null,
      });
    }
  }
  attachDocument(): void {
    if (
      this.anexarForm.valid &&
      this.selectedFile &&
      this.selectedDocument?.id
    ) {
      const signatureDate = this.anexarForm.get('signature_date')?.value;
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      if (signatureDate) {
        formData.append('signature_date', signatureDate);
      }

      const documentIndex = this.publicacoes.findIndex(
        (doc) => doc.id === this.selectedDocument?.id
      );

      // Manter o nome do arquivo original (primeiro arquivo)
      const originalFileName = this.publicacoes[documentIndex]?.file_name || '';

      this._service
        .attachDocument(this.selectedDocument.id, formData)
        .subscribe({
          next: (response) => {
            if (response.data.status) {
              if (documentIndex !== -1) {
                // Mantém o nome do arquivo original
                this.publicacoes[documentIndex].file_name = originalFileName;
                localStorage.setItem(
                  `doc_${this.selectedDocument?.id}_filename`,
                  originalFileName
                );
              }

              this.modalRef?.hide();
              this.selectedFile = null;
              this.anexarForm.reset();
              this._service.updatePublicacoes(this.publicacoes);
              this.getDiario(this.currentPage);
            }
          },
          error: (err) => {
            console.error('Erro ao anexar o documento:', err);
          },
        });
    }
  }
}
