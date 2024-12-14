import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-dados-da-licitacao-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dados-da-licitacao-administrativo.component.html',
  styleUrl: './dados-da-licitacao-administrativo.component.scss',
})
export class DadosDaLicitacaoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null],
    });

    this.dynamicFields = [
      {
        name: 'agency', type: 'select', label: 'Órgão da licitação', options: [
          { value: 'tipo1', label: 'Tipo 1' },
          { value: 'tipo2', label: 'Tipo 2' },
          { value: 'tipo3', label: 'Tipo 3' }
        ]
      },
      { name: 'unit.name', type: 'text', label: 'Unidade Compradora' },
      { name: 'goals', type: 'text', label: 'Título do Documento' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Documento da Licitação' },
      { name: 'call_instrument_id', type: 'text', label: 'Tipo de Instrumento Convocatório' },
      { name: 'number', type: 'text', label: 'Número da Compra' },
      { name: 'year', type: 'text', label: 'Ano da Compra' },
      { name: 'process_number', type: 'text', label: 'Número do Processo' },
      { name: 'legal_basic_id', type: 'text', label: 'Âmparo Legal' },
      { name: 'opening_date_proposal', type: 'text', label: 'Data da Abertura da Proposta' },
      { name: 'closing_date_proposal', type: 'text', label: 'Data do Encerramento da Proposta' },
      { name: 'goals', type: 'textarea', label: 'Objeto da Compra' },
      { name: 'additional_information', type: 'textarea', label: 'Informação Complementar' },
      { name: 'srp', type: 'checkbox', label: 'Compra do sistema de registro de preços?' },
      { name: 'title', type: 'title', label: 'Dados da Licitação' },
      { name: 'basic_productive_incentive', type: 'checkbox', label: 'Incentivo fiscal ppb?' },
      { name: 'confidential_budget', type: 'checkbox', label: 'Orçamento Sigiloso?' },
      { name: 'item_category_id', type: 'text', label: 'Categoria do Item' },
      { name: 'material_or_service', type: 'text', label: 'Material ou serviço?' },
      { name: 'description', type: 'textarea', label: 'Descrição do item' },
      { name: 'quantity', type: 'text', label: 'Quantidade' },
      { name: 'unit_of_measurement', type: 'text', label: 'Unidade de medida' },
      { name: 'estimated_unit_value', type: 'text', label: 'Valor unitário estimado' },
      { name: 'total_value', type: 'text', label: 'Valor Total' },
      { name: 'assets', type: 'text', label: 'Patrimônio' },
      { name: 'real_estate_registry_code', type: 'text', label: 'Código de Registro Imobiliário' },
      { name: 'applicability_normal_preference_margin', type: 'checkbox', label: 'Aplicabilidade da Margem de Preferência Normal' },
      { name: 'applicability_additional_preference_margin', type: 'checkbox', label: 'Aplicabilidade da Margem de Preferência Adicional' },
      { name: 'normal_preference_margin_percentage', type: 'text', label: 'Percentual da margem de preferência Normal %' },
      { name: 'additional_preference_margin_percentage', type: 'text', label: 'Percentual da margem de preferência Adicional %' },
      { name: 'ncm_nbs_code', type: 'text', label: 'Código NCM/NBS' },
      { name: 'ncm_nbs_description', type: 'textarea', label: 'Descrição NCM/NBS' },
    ];

  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filtroForm.patchValue({
        [fieldName]: file,
      });
    }
  }

  onFormSubmit() {
  }
}
