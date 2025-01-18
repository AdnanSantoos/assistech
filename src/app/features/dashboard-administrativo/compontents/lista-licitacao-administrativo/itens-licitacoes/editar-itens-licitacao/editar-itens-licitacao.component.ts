import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { LicitacaoItemModel } from '../../model/licitacoes-administrativo.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { CurrencyMaskDirective } from '../../../../../../shared/directives/currencyMask.directive';

@Component({
  selector: 'app-editar-itens-licitacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,CurrencyMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './editar-itens-licitacao.component.html',
  styleUrls: ['./editar-itens-licitacao.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditarItensLicitacaoComponent implements OnInit {
  editarItemForm!: FormGroup;
  licitacaoItens: LicitacaoItemModel[] = [];
  isLoading = true;
  itemCategoriaEnum = [
    { value: 1, key: 'Bens imóveis' },
    { value: 2, key: 'Bens móveis' },
    { value: 3, key: 'Não se aplica' },
  ];
  materialOuServicoEnum = [
    { value: 'M', key: 'Material' },
    { value: 'S', key: 'Serviço' },
  ];
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
  beneficiosEnum = [
    { value: 1, key: 'Participação exclusiva para ME/EPP' },
    { value: 2, key: 'Subcontratação para ME/EPP' },
    { value: 3, key: 'Cota reservada para ME/EPP' },
    { value: 4, key: 'Sem benefício' },
    { value: 5, key: 'Não se aplica' },
  ];
  situacaoItem = [
    { value: 1, key: 'Em Andamento' },
    { value: 2, key: 'Homologado' },
    { value: 3, key: 'Anulado/Revogado/Cancelado' },
    { value: 4, key: 'Deserto' },
    { value: 5, key: 'Fracassado' }
  ];
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
  ];
  constructor(
    private fb: FormBuilder,
    private licitacoesService: LicitacoesService,
    @Inject(MAT_DIALOG_DATA)
    public data: { itemId: string; licitacaoId: string },
    private dialogRef: MatDialogRef<EditarItensLicitacaoComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.itemId && this.data?.licitacaoId) {
      this.loadItemDetails(this.data.licitacaoId, this.data.itemId);
    } else {
      console.error('Item ID or Licitacao ID not provided.');
      this.isLoading = false;
    }
  }
  trackByFn(index: number, item: any): any {
    return item.id; // or any unique identifier
  }
  initializeForm(): void {
    this.editarItemForm = this.fb.group({
      number: [1],
      item_type: [''],
      benefit_type_id: [null],
      basic_productive_incentive: [false],
      description: ['', Validators.maxLength(2048)],
      quantity: [1, Validators.min(1)],
      unit_of_measurement: [''],
      estimated_unit_value: [null],
      total_value: [null],
      judging_criteria_id: [null],
      confidential_budget: [false],
      item_category_id: [null],
      real_estate_registry_code: [''],
      contract_item_situation_id: [null],
      applicability_normal_preference_margin: [false],
      applicability_additional_preference_margin: [false],
      normal_preference_margin_percentage: [null],
      additional_preference_margin_percentage: [null],
      ncm_nbs_code: [''],
      ncm_nbs_description: ['', [Validators.maxLength(2048)]],
      change_reason: [''],
      assets: [''],
    });
  }

  loadItemDetails(licitacaoId: string, itemId: string): void {
    this.isLoading = true;

    this.licitacoesService.getLicitacoesItens(licitacaoId, 1).subscribe({
      next: (response) => {
        if (Array.isArray(response.data)) {
          const item = response.data.find((itm) => itm.id === itemId);
          if (item) {
            this.populateForm(item);
          } else {
            console.error('Item não encontrado.');
          }
        } else {
          console.error('Resposta inválida: data não é um array.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do item:', err);
        this.isLoading = false;
      },
    });
  }

  populateForm(item: LicitacaoItemModel): void {
    this.editarItemForm.patchValue({
      number: item.number,
      item_type: item.item_type,
      benefit_type_id: item.benefit_type_id,
      basic_productive_incentive: item.basic_productive_incentive,
      description: item.description,
      quantity: item.quantity,
      unit_of_measurement: item.unit_of_measurement,
      estimated_unit_value: item.estimated_unit_value,
      total_value: item.total_value,
      judging_criteria_id: item.judging_criteria_id,
      confidential_budget: item.confidential_budget,
      item_category_id: item.item_category_id,
      real_estate_registry_code: item.real_estate_registry_code,
      contract_item_situation_id: item.contract_item_situation_id,
      applicability_normal_preference_margin:
        item.applicability_normal_preference_margin,
      applicability_additional_preference_margin:
        item.applicability_additional_preference_margin,
      normal_preference_margin_percentage:
        item.normal_preference_margin_percentage,
      additional_preference_margin_percentage:
        item.additional_preference_margin_percentage,
      ncm_nbs_code: item.ncm_nbs_code,
      ncm_nbs_description: item.ncm_nbs_description,
      change_reason: '',
      assets: item.assets || '',
    });
  }

  salvar(): void {
    if (this.editarItemForm.valid) {
      const payload = {
        id: this.data.itemId,
        procurement_id: this.data.licitacaoId,
        ...this.editarItemForm.value,
      };


      this.licitacoesService
        .updateLicitacaoItem(this.data.licitacaoId, this.data.itemId, payload)
        .subscribe({
          next: () => {
            this.dialogRef.close(true);
            window.location.reload()
          },
          error: (err) => {
            console.error('Erro ao atualizar item:', err);
          },
        });
    } else {
      console.error('Formulário inválido');
      this.editarItemForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
