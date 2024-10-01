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
    LayoutFormsAdmComponent,
  ],
  templateUrl: './contratos-administrativo.component.html',
  styleUrls: ['./contratos-administrativo.component.scss'],
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
      file: [null],
    });

    this.dynamicFields = [
      { name: 'selecioneLista', type: 'file', fileType: 'complex', label: 'Nº do contrato' },
      { name: 'receitaDespesa', type: 'toggle', label: 'Receita/Despesa' },
      {
        name: 'tipoContrato',
        type: 'select',
        label: 'Tipo do Contrato',
        options: [
          { value: 'tipo1', label: 'tipo 1' },
          { value: 'tipo2', label: 'tipo 2' },
          { value: 'tipo3', label: 'tipo 3' },
        ],
      },
      {
        name: 'categoriaProcesso',
        type: 'select',
        label: 'Categoria do Processo',
        options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' },
        ],
      },
      { name: 'numContrato', type: 'text', label: 'Número do contrato ou empenho' },
      { name: 'anoContrato', type: 'text', label: 'Ano do contrato' },
      { name: 'numProcesso', type: 'text', label: 'Número do processo ou empenho' },
      {
        name: 'tipoPessoa',
        type: 'select',
        label: 'Tipo da Pessoa',
        options: [
          { value: 'tipo1', label: 'tipo 1' },
          { value: 'tipo2', label: 'tipo 2' },
          { value: 'tipo3', label: 'tipo 3' },
        ],
      },
      { name: 'numProcesso', type: 'text', label: 'Número do processo ou empenho' },
    ];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file,
      });
    }
  }

  onFormSubmit() {}
}
