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

  beneficiosEnum = [
    { value: 1, key: 'Participação exclusiva para ME/EPP' },
    { value: 2, key: 'Subcontratação para ME/EPP' },
    { value: 3, key: 'Cota reservada para ME/EPP' },
    { value: 4, key: 'Sem benefício' },
    { value: 5, key: 'Não se aplica' },
  ]
  itemCategoriaEnum = [
    { value: 1, key: 'Bens imóveis' },
    { value: 2, key: 'Bens móveis' },
    { value: 3, key: 'Não se aplica' },
  ]
  criterioDeJulgamentoEnum = [
    { value: 1, key: 'Menor Preço' },
    { value: 2, key: 'Maior Desconto' },
    { value: 3, key: 'Melhor técnica ou conteúdo artístico' },
    { value: 4, key: 'Técnica e preço' },
    { value: 5, key: 'Maior Lance' },
    { value: 6, key: 'Maior retorno econômico' },
    { value: 7, key: 'Não se aplica' },
    { value: 8, key: 'Melhor técnica' },
    { value: 9, key: 'Conteúdo artístico' },
  ]
  unidadeDeMedidaEnum = [
    { value: 'Caixa', key: 'Caixa' },
    { value: 'Bloco', key: 'Bloco' },
    { value: 'Centímetro', key: 'Centímetro' },
    { value: 'Dúzia', key: 'Dúzia' },
    { value: 'Fardo', key: 'Fardo' },
    { value: 'Frasco', key: 'Frasco' },
    { value: 'Galão', key: 'Galão' },
    { value: 'Grama', key: 'Grama' },
    { value: 'Quilograma', key: 'Quilograma' },
    { value: 'Metro', key: 'Metro' },
    { value: 'Jogo', key: 'Jogo' },
    { value: 'Par', key: 'Par' },
    { value: 'Kit', key: 'Kit' },
    { value: 'Lata', key: 'Lata' },
    { value: 'Litro', key: 'Litro' },
    { value: 'Pacote', key: 'Pacote' },
    { value: 'Unidade', key: 'Unidade' },
    { value: 'Resma', key: 'Resma' },
    { value: 'Rolo', key: 'Rolo' },
    { value: 'Saco', key: 'Saco' },
    { value: 'Serviço', key: 'Serviço' }
  ];

  materialOuServicoEnum = [
    { value: "M", key: 'Material' },
    { value: "S", key: 'Serviço' }
  ];

  constructor(
    private licitacoesService: LicitacoesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private fb: FormBuilder, private modalService: BsModalService

  ) {
    this.novoItemForm = this.fb.group({
      procurement_id: [null,],
      item_type: [null,],
      benefit_type_id: [null,],
      basic_productive_incentive: [false],
      description: [null],
      quantity: [null],
      unit_of_measurement: [null],
      estimated_unit_value: [null],
      total_value: [null],
      judging_criteria_id: [null,],
      confidential_budget: [false],
      item_category_id: [null,],
      assets: [null],
      real_estate_registry_code: [null],
      // contract_item_situation_id: [null], // Situação do contrato - NÃO ESTÁ NA REQUISIÇÃO
      applicability_normal_preference_margin: [false], // Margem de preferência normal
      applicability_additional_preference_margin: [false], // Margem de preferência adicional
      // normal_preference_margin_percentage: [null], // Percentual de margem normal - NÃO ESTÁ NA REQUISIÇÃO
      // additional_preference_margin_percentage: [null], // Percentual de margem adicional - NÃO ESTÁ NA REQUISIÇÃO
      ncm_nbs_code: [null], // Código NCM/NBS
      ncm_nbs_description: [null], // Descrição NCM/NBS
      // change_reason: [null], // Motivo da mudança - NÃO ESTÁ NA REQUISIÇÃO
      // justification_in_person: [null], // Justificativa presencial - NÃO ESTÁ NA REQUISIÇÃO
      // source_system_link: [null], // Link do sistema de origem - NÃO ESTÁ NA REQUISIÇÃO
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const licitacaoId = params['id']; // Fetch ID from route
      if (licitacaoId) {
        this.loadLicitacaoDetails(licitacaoId);
        this.loadLicitacaoItens(licitacaoId, 1);
        this.novoItemForm.patchValue({ procurement_id: licitacaoId });
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

  goToPage(page: number) {
  }
  openAddItemModal(): void {

    const licitacaoId = this.route.snapshot.params['id']; // Captura o ID da URL

    if (!licitacaoId) {
      console.error('ID da licitação não encontrado na URL.');
      return;
    }

    // Busca os detalhes da licitação
    this.licitacoesService.getLicitacaoById(licitacaoId).subscribe({
      next: (response: RequisicaoModel<LicitacaoDetalhesModel>) => {
        const contractingModalityId = response.data.contracting_modality_id;

        console.log('Contracting Modality ID:', contractingModalityId);

        // Atualiza as listas com base no contracting_modality_id
        switch (contractingModalityId) {
          case 1:
            this.itemCategoriaEnum = [
              { value: 1, key: 'Bens imóveis' },
              { value: 2, key: 'Bens móveis' },
            ];
            this.beneficiosEnum = [
              { value: 5, key: 'Não se aplica' },
            ];
            this.criterioDeJulgamentoEnum = [
              { value: 5, key: 'Maior Lance' },
            ];
            break;

          case 2:
            this.itemCategoriaEnum = [
              { value: 3, key: 'Não se aplica' },
            ];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          case 3:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          case 4:
          case 5:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          case 6:
          case 7:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 5, key: 'Maior Lance' },
            ];
            break;

          case 8:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 5, key: 'Maior Lance' },
              { value: 7, key: 'Não se aplica' },
            ];
            break;

          case 9:
          case 10:
          case 11:
          case 12:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [{ value: 7, key: 'Não se aplica' }];
            break;

          case 13:
            this.itemCategoriaEnum = [
              { value: 1, key: 'Bens imóveis' },
              { value: 2, key: 'Bens móveis' },
            ];
            this.criterioDeJulgamentoEnum = [
              { value: 5, key: 'Maior Lance' },
            ];
            break;

          case 14:
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          default:
            console.warn('Contracting Modality ID não reconhecido.');
            break;
        }

        this.modalRef = this.modalService.show(this.addItemModal, { class: 'modal-lg' });
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes da licitação:', err);
      },
    });
  }



  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalRef = undefined; // Limpa a referência
    }
  }


  adicionarItem(): void {
    if (this.novoItemForm.invalid) {
      console.error('Formulário inválido. Verifique os campos obrigatórios.');
      return;
    }

    this.isLoadingItens = true;

    const formData = this.novoItemForm.value;

    const itemData = {
      procurement: formData.procurement_id,
      item: {
        id: formData.id,
        procurement_id: formData.procurement_id,
        item_type: formData.item_type,
        benefit_type_id: formData.benefit_type_id,
        basic_productive_incentive: formData.basic_productive_incentive,
        description: formData.description,
        quantity: formData.quantity,
        unit_of_measurement: formData.unit_of_measurement,
        estimated_unit_value: formData.estimated_unit_value,
        total_value: formData.total_value,
        judging_criteria_id: formData.judging_criteria_id,
        confidential_budget: formData.confidential_budget,
        item_category_id: formData.item_category_id,
        assets: formData.assets,
        real_estate_registry_code: formData.real_estate_registry_code,
        applicability_normal_preference_margin: formData.applicability_normal_preference_margin,
        applicability_additional_preference_margin: formData.applicability_additional_preference_margin,
        ncm_nbs_code: formData.ncm_nbs_code,
        ncm_nbs_description: formData.ncm_nbs_description,
      } as LicitacaoItemModel,
    };


    this.licitacoesService.createLicitacaoItem(itemData).subscribe({
      next: () => {
        console.log('Item de licitação criado com sucesso!');
        this.novoItemForm.reset();
        this.closeModal();
        this.loadLicitacaoItens(formData.procurement_id, 1);
        this.isLoadingItens = false;
      },
      error: (err) => {
        console.error('Erro ao criar item de licitação:', err);
        this.isLoadingItens = false;
      },
    });
  }



}
