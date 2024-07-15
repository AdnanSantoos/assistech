import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-licitacoes-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './licitacoes-administrativo.component.html',
  styleUrl: './licitacoes-administrativo.component.scss'
})
export class LicitacoesAdministrativoComponent {
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
      { name: 'numeroDaLicitacao', type: 'text', label: 'Nº da licitação' },
      { name: 'objetoLicitacao', type: 'text', label: 'Objeto da licitação' },
      { name: 'dataDaLicitacao', type: 'text', label: 'Data da Licitação' },
      { name: 'modalidade', type: 'text', label: 'modalidade' },
      { name: 'srp', type: 'text', label: 'srp' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Contrato: Procedimento na integra' },
      //////////////////////////////////////////////////////////////////
      { name: 'status', type: 'text', label: 'status' },
      { name: 'orgao', type: 'text', label: 'órgão' },
      { name: 'numeroDoProcessoAdministrativo', type: 'text', label: 'nº do processo administrativo' },
      { name: 'numeroDoEdital', type: 'text', label: 'nº do edital' },
      { name: 'localDeExecucaoDoContrato', type: 'text', label: 'Local de execução do contrato' },
      { name: 'dataDaPublicacao', type: 'text', label: 'data da publicação' },
      { name: 'vigencia', type: 'text', label: 'vigência' },
      { name: 'previsaoOrcamentaria', type: 'text', label: 'previsão orçamentária' },
      { name: 'fiscal', type: 'text', label: 'fiscal' },
      { name: 'possuiAditivo', type: 'text', label: 'Possui Aditivo?' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Arquivo do processo' }
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
    console.log(this.filtroForm.value);
  }
}
