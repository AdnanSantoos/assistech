import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ContratoModel } from '../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { ContratosService } from '../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-lista-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule
  ],
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private contratosService: ContratosService) { }

  ngOnInit() {
    this.carregarContratos(this.currentPage);
  }
  

  visualizar(value:any){
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
  onDelete(id: string): void {
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
