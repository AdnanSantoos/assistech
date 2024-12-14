import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { LicitacaoDetalhesModel, LicitacaoItemModel, LicitacaoResultados } from '../../model/licitacoes-administrativo.model';
import { RequisicaoModel, PaginationModel } from '../../../../../../shared/models/shared.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarItensLicitacaoComponent } from '../editar-itens-licitacao/editar-itens-licitacao.component';
import { ResultadoLicitacaoComponent } from '../resultado-licitacao/resultado-licitacao.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-itens-licitacoes',
  standalone: true,
  imports: [CommonModule, MatDialogModule, RouterModule, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './itens-licitacoes.component.html',
  styleUrls: ['./itens-licitacoes.component.scss'],
})
export class ItensLicitacoesComponent implements OnInit {

  @ViewChild('addItemModal') addItemModal: any;
  novoItemForm: FormGroup;

  licitacaoDetalhes: LicitacaoDetalhesModel | null = null;
  licitacaoItens: LicitacaoItemModel[] = [];
  pagination: PaginationModel | null = null;
  modalRef?: BsModalRef;

  isLoadingDetails = true;
  isLoadingItens = true;

  constructor(
    private licitacoesService: LicitacoesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder, private modalService: BsModalService

  ) {
    this.novoItemForm = this.fb.group({
      id: [''],
      procurement_id: ['', Validators.required],
      number: ['', Validators.required],
      item_type: ['', Validators.required],
      benefit_type_id: [null, Validators.required],
      basic_productive_incentive: [false],
      description: ['', [Validators.required, Validators.maxLength(2048)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit_of_measurement: ['', Validators.required],
      estimated_unit_value: [0, [Validators.required, Validators.min(0)]],
      total_value: [0, [Validators.required, Validators.min(0)]],
      judging_criteria_id: [null, Validators.required],
      confidential_budget: [false],
      item_category_id: [null, Validators.required],
      assets: [null],
      real_estate_registry_code: [null],
      contract_item_situation_id: [null],
      applicability_normal_preference_margin: [false],
      applicability_additional_preference_margin: [false],
      normal_preference_margin_percentage: [0],
      additional_preference_margin_percentage: [0],
      ncm_nbs_code: [null],
      ncm_nbs_description: [null]
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const licitacaoId = params['id']; // Fetch ID from route
      if (licitacaoId) {
        this.loadLicitacaoDetails(licitacaoId);
        this.loadLicitacaoItens(licitacaoId, 1);
      } else {
        console.error('Licitacao ID not provided in route parameters.');
      }
    });
  }

  contractItemStatuses: Record<number, string> = {
    1: 'Em Andamento',
    2: 'Homologado',
    3: 'Anulado/Revogado/Cancelado',
    4: 'Deserto',
    5: 'Fracassado',
  };

  getContractItemStatus(statusId: number): string {
    return this.contractItemStatuses[statusId] || 'Status Desconhecido';
  }

  openEditDialog(item: LicitacaoItemModel): void {
    this.dialog.open(EditarItensLicitacaoComponent, {
      width: '800px',
      panelClass: 'custom-dialog-container',
      data: { itemId: item.id, licitacaoId: this.route.snapshot.params['id'] },
    });
  }
  openResultadoDialog(item: LicitacaoItemModel): void {
    const licitacaoId = this.route.snapshot.params['id'];

    this.licitacoesService.getResultadosItem(licitacaoId, item.id).subscribe({
      next: (response: RequisicaoModel<LicitacaoResultados[]>) => {
        const resultados: LicitacaoResultados[] = response?.data || [];

        this.dialog.open(ResultadoLicitacaoComponent, {
          width: '800px',
          panelClass: 'custom-dialog-container',
          data: {
            itemId: item.id,
            licitacaoId: licitacaoId,
            licitacao: this.licitacaoDetalhes,
            resultados: resultados,
          },
        });
      },
      error: (err) => {
        console.error('Erro ao carregar os resultados do item:', err);
      },
    });
  }


  loadLicitacaoDetails(licitacaoId: string): void {
    this.isLoadingDetails = true;
    this.licitacoesService.getLicitacaoById(licitacaoId).subscribe({
      next: (response: RequisicaoModel<LicitacaoDetalhesModel>) => {
        this.licitacaoDetalhes = response.data; // Store licitacao details
        this.isLoadingDetails = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da licitação:', err);
        this.isLoadingDetails = false;
      },
    });
  }

  loadLicitacaoItens(licitacaoId: string, page: number): void {
    this.isLoadingItens = true;
    this.licitacoesService.getLicitacoesItens(licitacaoId, page).subscribe({
      next: (response: RequisicaoModel<LicitacaoItemModel[]>) => {
        this.licitacaoItens = response.data; // Store licitacao items
        this.pagination = response.meta?.pagination || null;
        this.isLoadingItens = false;
      },
      error: (err) => {
        console.error('Erro ao carregar itens da licitação:', err);
        this.isLoadingItens = false;
      },
    });
  }

  nextPage(): void {
    if (this.pagination && this.pagination.current_page < this.pagination.last_page) {
      this.loadLicitacaoItens(this.route.snapshot.params['id'], this.pagination.current_page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination && this.pagination.current_page > 1) {
      this.loadLicitacaoItens(this.route.snapshot.params['id'], this.pagination.current_page - 1);
    }
  }


  irParaPncp(page: number): void {
    this.licitacoesService.getLicitacoes(page).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          const licitacao = response.data[0];
          const { year, gateway_sequence, agency } = licitacao;

          if (agency && agency.country_register) {
            const baseUrl = 'https://treina.pncp.gov.br/app/editais/';
            const fullUrl = `${baseUrl}${agency.country_register}/${year}/${gateway_sequence}`;

            window.open(fullUrl, '_blank');
          } else {
            console.error('Invalid agency data or missing country_register.');
          }
        } else {
          console.warn('Nenhuma licitação encontrada.');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar licitações:', err);
      },
    });
  }


  openAddItemModal(): void {
    this.modalService.show(this.addItemModal, { class: 'modal-lg' });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  adicionarItem(): void {
    if (this.novoItemForm.valid) {
      console.log(this.novoItemForm.value);
      this.closeModal();
    }
  }
}
