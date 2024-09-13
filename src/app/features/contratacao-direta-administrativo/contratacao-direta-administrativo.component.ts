import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contratacao-direta-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './contratacao-direta-administrativo.component.html',
  styleUrls: ['./contratacao-direta-administrativo.component.scss']
})
export class ContratacaoDiretaAdministrativoComponent {
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
      { name: 'numeroDaContratacao', type: 'text', label: 'Nº da contratação' },
      { name: 'numeroDoProcesso', type: 'text', label: 'Nº da contratação' },
      { name: 'dataDaPublicacao', type: 'text', label: 'Data da Publicação' },
      { name: 'objeto', type: 'text', label: 'objeto' },
      { name: 'modalidade', type: 'text', label: 'modalidade' },
      { name: 'status', type: 'text', label: 'status' },
      { name: 'numeroDaDispensa', type: 'text', label: 'nº da dispensa' },
      { name: 'localDeExecucao', type: 'text', label: 'Local de Execução' },
      { name: 'fiscal', type: 'text', label: 'fiscal' },
      {
        name: 'possuiSRP', type: 'select', label: 'Possui SRP?', options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ]
      },
      {
        name: 'possuiAditivo', type: 'select', label: 'Possui Aditivo?', options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ]
      },
      { name: 'contratada', type: 'text', label: 'contratada' },
      { name: 'contratoProcedimentoNaIntegra', type: 'file', fileType: 'simple', label: 'Contrato: Procedimento na integra' },
      { name: 'valorDoContrato', type: 'text', label: 'Valor do Contrato' },
      { name: 'tipoEspecie', type: 'text', label: 'Tipo Espécie' },
      { name: 'numeroDoContratoAdtivado', type: 'text', label: 'Número do contrato Adtivado' },
      { name: 'valorDoAdtivado', type: 'text', label: 'Valor do Adtivado' },
      { name: 'fundamentoLegal', type: 'text', label: 'Fundamento Legal' },
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
