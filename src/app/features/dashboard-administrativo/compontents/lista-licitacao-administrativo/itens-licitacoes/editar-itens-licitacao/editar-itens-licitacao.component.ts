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

  initializeForm(): void {
    this.editarItemForm = this.fb.group({
      benefit_type_id: ['', Validators.required],
      item_type: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(2048)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unit_of_measurement: ['', Validators.required],
      estimated_unit_value: ['', Validators.required],
      total_value: ['', Validators.required],
      confidential_budget: ['Não', Validators.required],
      item_category_id: ['', Validators.required],
      real_estate_registry_code: [''],
      contract_item_situation_id: ['', Validators.required],
      applicability_normal_preference_margin: ['Não', Validators.required],
      applicability_additional_preference_margin: ['Não', Validators.required],
      normal_preference_margin_percentage: [''],
      additional_preference_margin_percentage: [''],
      ncm_nbs_code: [''],
      ncm_nbs_description: ['', [Validators.maxLength(2048)]],
      motivoEdicao: ['', Validators.maxLength(2048)],
    });
  }

  loadItemDetails(licitacaoId: string, itemId: string): void {
    this.isLoading = true;
    this.licitacoesService.getLicitacoesItens(licitacaoId, 1).subscribe({
      next: (response) => {
        const item = response.data.find((itm) => itm.id === itemId);
        if (item) {
          this.populateForm(item);
        } else {
          console.error('Item not found.');
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading item details:', err);
        this.isLoading = false;
      },
    });
  }

  populateForm(item: LicitacaoItemModel): void {
    this.editarItemForm.patchValue({
      benefit_type_id: item.benefit_type_id,
      item_type: item.item_type,
      description: item.description,
      quantity: item.quantity,
      unit_of_measurement: item.unit_of_measurement,
      estimated_unit_value: item.estimated_unit_value,
      total_value: item.total_value,
      confidential_budget: item.confidential_budget ? 'Sim' : 'Não',
      item_category_id: item.item_category_id,
      real_estate_registry_code: item.real_estate_registry_code,
      contract_item_situation_id: item.contract_item_situation_id,
      applicability_normal_preference_margin: item.applicability_normal_preference_margin ? 'Sim' : 'Não',
      applicability_additional_preference_margin: item.applicability_additional_preference_margin ? 'Sim' : 'Não',
      normal_preference_margin_percentage: item.normal_preference_margin_percentage,
      additional_preference_margin_percentage: item.additional_preference_margin_percentage,
      ncm_nbs_code: item.ncm_nbs_code,
      ncm_nbs_description: item.ncm_nbs_description,
    });
  }

  salvar(): void {
    if (this.editarItemForm.valid) {
      console.log('Form Data:', this.editarItemForm.value);
      this.dialogRef.close(this.editarItemForm.value); // Close dialog with form data
    } else {
      console.error('Formulário inválido');
    }
  }

  cancelar(): void {
    this.dialogRef.close(); // Close dialog without changes
  }
}
