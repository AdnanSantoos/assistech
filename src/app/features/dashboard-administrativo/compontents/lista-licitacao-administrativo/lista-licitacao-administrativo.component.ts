import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { LicitacaoData } from '../../model/licitacao.model';
const LICITACAO_DATA: LicitacaoData[] = [
  {
    numSeq: 1,
    liciNum: 2021001,
    numCompra: 300045,
    ano: '2021',
    numProcesso: 145678,
    orgao: 'Prefeitura de Cidade A',
    unidade: 'Secretaria de Obras',
    criadoEm: '2021-05-10',
    acoes: 'Em andamento',
  },
  {
    numSeq: 2,
    liciNum: 2023002,
    numCompra: 300123,
    ano: '2023',
    numProcesso: 146789,
    orgao: 'Câmara de Cidade B',
    unidade: 'Departamento de Finanças',
    criadoEm: '2023-02-15',
    acoes: 'Finalizado',
  },
  {
    numSeq: 3,
    liciNum: 2024001,
    numCompra: 300678,
    ano: '2024',
    numProcesso: 148910,
    orgao: 'Prefeitura de Cidade C',
    unidade: 'Secretaria de Educação',
    criadoEm: '2024-01-20',
    acoes: 'Aguardando início',
  },
];

@Component({
  selector: 'app-lista-licitacao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    RouterModule,
  ],
  templateUrl: './lista-licitacao-administrativo.component.html',
  styleUrl: './lista-licitacao-administrativo.component.scss',
})
export class ListaLicitacaoAdministrativoComponent {
  displayedColumns: string[] = [
    'numSeq',
    'liciNum',
    'numCompra',
    'ano',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<LicitacaoData>(LICITACAO_DATA);
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
    this.dataSource.data = LICITACAO_DATA.slice(startIndex, endIndex);
  }
}
