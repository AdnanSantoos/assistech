import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ContratoData } from '../../model/contrato.model';
const CONTRATO_DATA: ContratoData[] = [
  {
    numSeq: 1,
    contratoPNCP: 2021001,
    numProcesso: 145678,
    orgao: 'Prefeitura de Cidade A',
    unidade: 'Secretaria de Obras',
    criadoEm: '2021-05-10',
    acoes: 'Em andamento',
  },
  {
    numSeq: 2,
    contratoPNCP: 2023002,
    numProcesso: 146789,
    orgao: 'Câmara de Cidade B',
    unidade: 'Departamento de Finanças',
    criadoEm: '2023-02-15',
    acoes: 'Finalizado',
  },
  {
    numSeq: 3,
    contratoPNCP: 2024001,
    numProcesso: 148910,
    orgao: 'Prefeitura de Cidade C',
    unidade: 'Secretaria de Educação',
    criadoEm: '2024-01-20',
    acoes: 'Aguardando início',
  },
];

@Component({
  selector: 'app-lista-contratos-administrativo',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    RouterModule,],
  templateUrl: './lista-contratos-administrativo.component.html',
  styleUrl: './lista-contratos-administrativo.component.scss'
})
export class ListaContratosAdministrativoComponent {
  displayedColumns: string[] = [
    'numSeq',
    'contratoPNCP',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<ContratoData>(CONTRATO_DATA);
  pageSize = 10;
  currentPage = 1;
  totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator; // Conectando o paginador aos dados da tabela
  }
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateTableData();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTableData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTableData();
    }
  }

  updateTableData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.dataSource.data = CONTRATO_DATA.slice(startIndex, endIndex);
  }
}
