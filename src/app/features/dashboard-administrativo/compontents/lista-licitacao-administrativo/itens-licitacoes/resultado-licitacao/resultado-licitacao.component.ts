import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacaoResultados } from '../../model/licitacoes-administrativo.model';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-resultado-licitacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './resultado-licitacao.component.html',
  styleUrls: ['./resultado-licitacao.component.scss'],
})
export class ResultadoLicitacaoComponent implements OnInit {
  @ViewChild('addResultadoModal') addResultadoModal!: TemplateRef<any>;
  resultados: LicitacaoResultados[] = [];
  licitacao: { quantity?: number; estimated_unit_value?: number } = {};
  totalResults: number = 0;
  resultsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  modalRef?: BsModalRef;
  novoResultadoForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResultadoLicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: string; licitacaoId: string },
    private licitacoesService: LicitacoesService,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) {
    this.novoResultadoForm = this.fb.group({
      id: [''],
      procurement_item_id: [''],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      total_price: [0, [Validators.required, Validators.min(0)]],
      person_type: ['', [Validators.required]],
      supplier_ni: ['', [Validators.required]],
      supplier_name_or_social_reason: ['', [Validators.required]],
      supplier_size_id: [0, [Validators.required]],
      legal_nature_id: ['', [Validators.required]],
      country_code: ['', [Validators.required]],
      subcontracting_indicator: [false],
      srp_classification_order: [0],
      date: ['', [Validators.required]],
      discount_percentage: ['0.0000', [Validators.required]],
      gateway_sequence: [0, [Validators.required]],
      status: [1, [Validators.required]],
      preference_margin_applicability: [false],
      preference_margin_legal_basis: [null],
      product_origin_country: [null],
      benefit_me_epp_applicability: [false],
      tiebreaker_criterion_applicability: [false],
      tiebreaker_criterion_legal_basis: [null],
      foreign_currency_symbol: [null],
      foreign_currency_exchange_date: ['', [Validators.required]],
      foreign_currency_timezone_offset: [null],
      foreign_currency_nominal_value: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data.licitacaoId && this.data.itemId) {
      this.loadItemDetails(this.data.licitacaoId, this.data.itemId);
      this.loadResultados();
    } else {
      console.error('IDs necessários (licitacaoId e itemId) não fornecidos.');
    }
  }

  loadItemDetails(licitacaoId: string, itemId: string): void {
    this.licitacoesService.getLicitacoesItens(licitacaoId, 1).subscribe({
      next: (response) => {
        const item = response.data.find((itm: any) => itm.id === itemId);
        if (item) {
          this.licitacao = {
            quantity: item.quantity,
            estimated_unit_value: item.estimated_unit_value,
          };
        } else {
          console.error('Item não encontrado.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar os detalhes do item:', err);
      },
    });
  }

  loadResultados(): void {
    this.licitacoesService.getResultadosItem(this.data.licitacaoId, this.data.itemId).subscribe({
      next: (response) => {
        this.resultados = response.data || [];
        this.totalResults = this.resultados.length;
        this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
        console.log('Resultados carregados:', this.resultados);
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

  deleteResultado(resultadoId: string): void {
    console.log(`Excluir resultado com ID: ${resultadoId}`);
  }

  openAddResultadoModal(): void {
    this.modalRef = this.modalService.show(this.addResultadoModal, { class: 'modal-lg' });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  adicionarResultado(): void {
    if (this.novoResultadoForm.valid) {
      const novoResultado = this.novoResultadoForm.value;
      console.log('Novo resultado adicionado:', novoResultado);
      this.resultados.push(novoResultado);
      this.closeModal();
    } else {
      console.error('Formulário inválido');
      this.novoResultadoForm.markAllAsTouched();
    }
  }
}
