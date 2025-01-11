import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PCAData } from '../../model/pca.model';

const PCA_DATA: PCAData[] = [
  {
    numSeq: 1,
    orgao: 'Prefeitura de Cidade A',
    unidade: 'Secretaria de Obras',
    ano: 2024,
    criadoEm: '2021-05-10',
    acoes: 'Em andamento',
  },
  {
    numSeq: 2,
    orgao: 'Câmara de Cidade B',
    unidade: 'Departamento de Finanças',
    ano: 2023,
    criadoEm: '2023-02-15',
    acoes: 'Finalizado',
  },
  {
    numSeq: 3,
    orgao: 'Prefeitura de Cidade C',
    unidade: 'Secretaria de Educação',
    ano: 2022,
    criadoEm: '2024-01-20',
    acoes: 'Aguardando início',
  },
];

@Component({
  selector: 'app-pca-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    RouterModule,
  ],
  templateUrl: './pca-administrativo.component.html',
  styleUrl: './pca-administrativo.component.scss',
})
export class PcaAdministrativoComponent {
  displayedColumns: string[] = [
    'numSeq',
    'contratoPNCP',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<PCAData>(PCA_DATA);
  pageSize = 10;
  currentPage = 1;
  totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public route: ActivatedRoute) {}

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
    this.dataSource.data = PCA_DATA.slice(startIndex, endIndex);
  }
}
