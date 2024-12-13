import { Component, Inject, OnInit } from '@angular/core';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacaoResultados } from '../../model/licitacoes-administrativo.model';

@Component({
  selector: 'app-resultado-licitacao',
  templateUrl: './resultado-licitacao.component.html',
  styleUrls: ['./resultado-licitacao.component.scss'],
})
export class ResultadoLicitacaoComponent implements OnInit {
  resultados: LicitacaoResultados[] = [];
  licitacao: Partial<LicitacaoResultados> = {}; // Cabeçalho
  totalResults: number = 0; // Total de resultados
  resultsPerPage: number = 10; // Resultados por página (ajustável)
  currentPage: number = 1; // Página atual
  totalPages: number = 1; // Total de páginas (fixado em 1 por padrão)

  constructor(
    public dialogRef: MatDialogRef<ResultadoLicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: string; licitacaoId: string },
    private licitacoesService: LicitacoesService
  ) {}

  ngOnInit(): void {
    // Garantindo que IDs foram fornecidos
    if (this.data.licitacaoId && this.data.itemId) {
      this.loadResultados();
    } else {
      console.error('IDs necessários (licitacaoId e itemId) não fornecidos.');
    }
  }

  /**
   * Carrega os resultados e preenche cabeçalho e tabela
   */
  loadResultados(): void {
    this.licitacoesService.getResultadosItem(this.data.licitacaoId, this.data.itemId).subscribe({
      next: (response) => {
        this.resultados = response.data;

        if (this.resultados.length > 0) {
          const firstResult = this.resultados[0]; // Dados do primeiro item
          this.licitacao = {
            gateway_sequence: firstResult.gateway_sequence,
            id: firstResult.procurement_item_id,
            quantity: firstResult.quantity,
            total_price: firstResult.total_price,
          };
        } else {
          this.licitacao = {}; // Reseta os dados do cabeçalho se não houver resultados
        }

        this.totalResults = this.resultados.length;
        this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
      },
      error: (err) => {
        console.error('Erro ao carregar resultados:', err);
      },
    });
  }

  /**
   * Lógica de paginação (implementada para comportar mais de uma página no futuro)
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadResultados();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadResultados();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadResultados();
    }
  }

  /**
   * Lógica de exclusão de resultados
   */
  deleteResultado(resultadoId: string): void {
    console.log(`Excluir resultado com ID: ${resultadoId}`);
    // Implementar a lógica de exclusão no futuro
  }

  adicionarNovoResultado(): void {
    console.log('Adicionar novo resultado');
    // Implementar lógica para adicionar um novo resultado
  }
}
