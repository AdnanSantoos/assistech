import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GerenciadorDiarioOficialService } from './service/gerenciador-diario-oficial.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { DiarioOficialPublicacoes } from './models/gerenciador-diario-oficial.model';
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

  constructor(
    private _location: Location,
    private _service: GerenciadorDiarioOficialService,
    private dialog: MatDialog,
    public tenantService: TenantService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.isStaff = this.tenantService.getStaff();
    this.getDiario(this.currentPage);
  }

  getDiario(page: number) {
    this._service.getDashboard(page).subscribe((res: RequisicaoModel<DiarioOficialPublicacoes[]>) => {
      this.documents = res.data;
      this.currentPage = res.meta?.pagination.current_page!;
      this.totalPages = res.meta?.pagination.last_page!;
    })
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

}
