import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { LicitacaoModel } from './model/licitacoes-administrativo.model';
import { LicitacoesService } from './service/licitacoes-administrativos.service';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-lista-licitacao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './lista-licitacao-administrativo.component.html',
  styleUrls: ['./lista-licitacao-administrativo.component.scss'],
})
export class ListaLicitacaoAdministrativoComponent implements OnInit {
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
  dataSource = new MatTableDataSource<LicitacaoModel>([]);
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private licitacoesService: LicitacoesService) { }

  ngOnInit(): void {
    this.loadLicitacoes(this.currentPage);
  }

  loadLicitacoes(page: number): void {
    this.licitacoesService.getLicitacoes(page).subscribe({
      next: (response) => {
        this.dataSource.data = response.data.map((licitacao, index) => ({
          ...licitacao,
          numSeq: (page - 1) * this.pageSize + index + 1, // Numeração sequencial
        }));
        this.totalRecords = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro ao carregar licitações:', err);
      },
    });
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadLicitacoes(pageNumber);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLicitacoes(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLicitacoes(this.currentPage);
    }
  }
}
