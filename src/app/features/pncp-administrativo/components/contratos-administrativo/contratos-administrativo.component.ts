import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './contratos-administrativo.component.html',
  styleUrls: ['./contratos-administrativo.component.scss']
})
export class ContratosAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null]
    });

    this.dynamicFields = [
      { name: 'numeroDoContrato', type: 'text', label: 'Nº do contrato' },
      { name: 'fornecedor', type: 'text', label: 'fornecedor' },
      { name: 'dataDaPublicacao', type: 'text', label: 'Data da Publicação' },
      { name: 'objeto', type: 'text', label: 'objeto' },
      { name: 'cnpj', type: 'text', label: 'cnpj' },
      { name: 'valor', type: 'text', label: 'valor' },
      { name: 'dataInicial', type: 'text', label: 'Data Inicial' },
      {
        name: 'vigencia', type: 'select', label: 'vigência', options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ]
      },
      { name: 'dataFinal', type: 'text', label: 'Data Final' },
      { name: 'fiscalDoContrato', type: 'text', label: 'Fiscal do contrato' },
      {
        name: 'modalidade', type: 'select', label: 'modalidade', options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ]
      },
      {
        name: 'possuiAditivo', type: 'select', label: 'Possui aditivo?', options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ]
      },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
    ];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file
      });
    }
  }

  onFormSubmit() {
  }
}
