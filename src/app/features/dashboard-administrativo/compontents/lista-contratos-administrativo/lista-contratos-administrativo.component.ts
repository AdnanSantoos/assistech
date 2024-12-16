import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ContratoModel } from '../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { ContratosService } from '../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-lista-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [BsModalService],
  templateUrl: './lista-contratos-administrativo.component.html',
  styleUrls: ['./lista-contratos-administrativo.component.scss'],
})
export class ListaContratosAdministrativoComponent implements OnInit {
  displayedColumns: string[] = [
    'numSeq',
    'contratoPNCP',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<ContratoModel>([]);
  totalPages = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  deleteForm!: FormGroup;
  modalRef?: BsModalRef;
  selectedContrato: ContratoModel | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contratosService: ContratosService, private fb: FormBuilder, private modalService: BsModalService, private _location: Location
  ) {
    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.carregarContratos(this.currentPage);
  }


  visualizar(value: any) {
    const contrato = value;
    const { year, gateway_sequence, procurement } = contrato;
    if (procurement && procurement.agency.country_register) {
      const baseUrl = 'https://treina.pncp.gov.br/app/contratos/';
      const fullUrl = `${baseUrl}${procurement.agency.country_register}/${year}/${gateway_sequence}`;

      window.open(fullUrl, '_blank');
    } else {
      console.error('Invalid agency data or missing country_register.');
    }
  }

  carregarContratos(page: number): void {
    this.contratosService.getContratos(page).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      },
      error: () => {
        console.error('Erro ao carregar contratos.');
      },
    });
  }
  onEdit(id: string): void {
  }
  openDeleteModal(contrato: ContratoModel, template: TemplateRef<any>): void {
    this.selectedContrato = contrato;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }

  confirmDelete(): void {
    if (this.deleteForm.valid && this.selectedContrato) {
      const justification = this.deleteForm.value.justification;

      this.contratosService.deleteContrato(this.selectedContrato.id, justification).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.carregarContratos(this.currentPage); // Atualiza a lista
        },
        error: (err) => {
          this.modalRef?.hide();
        },
      });
    }
  }
  goBack(): void {
    this._location.back();
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.carregarContratos(this.currentPage);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.carregarContratos(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.carregarContratos(this.currentPage);
    }
  }
}
