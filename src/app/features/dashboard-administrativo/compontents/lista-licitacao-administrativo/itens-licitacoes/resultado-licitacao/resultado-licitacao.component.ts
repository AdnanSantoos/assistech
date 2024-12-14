import { Component, Inject, OnInit } from '@angular/core';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacaoResultados } from '../../model/licitacoes-administrativo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultado-licitacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultado-licitacao.component.html',
  styleUrls: ['./resultado-licitacao.component.scss'],
})
export class ResultadoLicitacaoComponent implements OnInit {
  resultados: LicitacaoResultados[] = [];
  licitacao: Partial<LicitacaoResultados> = {};
  totalResults: number = 0;
  resultsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(
    public dialogRef: MatDialogRef<ResultadoLicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: string; licitacaoId: string },
    private licitacoesService: LicitacoesService
  ) { }

  ngOnInit(): void {
    if (this.data.licitacaoId && this.data.itemId) {
      this.loadResultados();
    } else {
      console.error('IDs necessários (licitacaoId e itemId) não fornecidos.');
    }
  }

  loadResultados(): void {
    this.licitacoesService.getResultadosItem(this.data.licitacaoId, this.data.itemId).subscribe({
      next: (response) => {
        this.resultados = response.data;
        console.log("resultados", this.resultados)
        if (this.resultados.length > 0) {
          const firstResult = this.resultados[0];
          this.licitacao = {
            gateway_sequence: firstResult.gateway_sequence,
            id: firstResult.procurement_item_id,
            quantity: firstResult.quantity,
            total_price: firstResult.total_price,
          };
        } else {
          this.licitacao = {};
        }

        this.totalResults = this.resultados.length;
        this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
      },
      error: (err) => {
        console.error('Erro ao carregar resultados:', err);
      },
    });
  }

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

  deleteResultado(resultadoId: string): void {
    console.log(`Excluir resultado com ID: ${resultadoId}`);

  }

  adicionarNovoResultado(): void {
    console.log('Adicionar novo resultado');
  }
}
