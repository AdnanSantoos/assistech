import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { LicitacaoItemModel } from '../../model/licitacoes-administrativo.model';

@Component({
  selector: 'app-editar-itens-licitacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-itens-licitacao.component.html',
  styleUrls: ['./editar-itens-licitacao.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditarItensLicitacaoComponent implements OnInit {
  editarItemForm!: FormGroup;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private licitacoesService: LicitacoesService,
    @Inject(MAT_DIALOG_DATA) public data: { itemId: string; licitacaoId: string },
    private dialogRef: MatDialogRef<EditarItensLicitacaoComponent>
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.itemId && this.data?.licitacaoId) {
      this.loadItemDetails(this.data.licitacaoId, this.data.itemId);
    } else {
      console.error('Item ID or Licitacao ID not provided.');
      this.isLoading = false;
    }
  }

  initializeForm(): void {
    this.editarItemForm = this.fb.group({
      number: [1, Validators.required],
      item_type: ['', Validators.required],
      benefit_type_id: [null, Validators.required],
      basic_productive_incentive: [false, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(2048)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_of_measurement: ['', Validators.required],
      estimated_unit_value: [null, Validators.required],
      total_value: [null, Validators.required],
      judging_criteria_id: [null, Validators.required],
      confidential_budget: [false, Validators.required],
      item_category_id: [null, Validators.required],
      real_estate_registry_code: [''],
      contract_item_situation_id: [null, Validators.required],
      applicability_normal_preference_margin: [false, Validators.required],
      applicability_additional_preference_margin: [false, Validators.required],
      normal_preference_margin_percentage: [null],
      additional_preference_margin_percentage: [null],
      ncm_nbs_code: [''],
      ncm_nbs_description: ['', [Validators.maxLength(2048)]],
      change_reason: ['', Validators.required],
      assets: ['', Validators.required],

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
      applicability_normal_preference_margin: item.applicability_normal_preference_margin,
      applicability_additional_preference_margin: item.applicability_additional_preference_margin,
      normal_preference_margin_percentage: item.normal_preference_margin_percentage,
      additional_preference_margin_percentage: item.additional_preference_margin_percentage,
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

      console.log('Payload enviado:', payload);

      this.licitacoesService
        .updateLicitacaoItem(this.data.licitacaoId, this.data.itemId, payload)
        .subscribe({
          next: () => {
            console.log('Item atualizado com sucesso!');
            this.dialogRef.close(true);
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
