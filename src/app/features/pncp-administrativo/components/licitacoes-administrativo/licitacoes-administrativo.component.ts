import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-licitacoes-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './licitacoes-administrativo.component.html',
  styleUrls: ['./licitacoes-administrativo.component.scss']
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
      { name: 'modalidade', type: 'text', label: 'Modalidade' },
      { name: 'srp', type: 'text', label: 'SRP' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Contrato: Procedimento na íntegra' },
      { name: 'status', type: 'text', label: 'Status' },
      { name: 'orgao', type: 'text', label: 'Órgão' },
      { name: 'numeroDoProcessoAdministrativo', type: 'text', label: 'Nº do processo administrativo' },
      { name: 'numeroDoEdital', type: 'text', label: 'Nº do edital' },
      { name: 'localDeExecucaoDoContrato', type: 'text', label: 'Local de execução do contrato' },
      { name: 'dataDaPublicacao', type: 'text', label: 'Data da publicação' },
      { name: 'vigencia', type: 'text', label: 'Vigência' },
      { name: 'previsaoOrcamentaria', type: 'text', label: 'Previsão orçamentária' },
      { name: 'fiscal', type: 'text', label: 'Fiscal' },
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
  }
}
