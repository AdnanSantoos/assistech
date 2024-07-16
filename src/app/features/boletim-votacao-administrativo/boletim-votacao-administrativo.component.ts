import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-boletim-votacao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './boletim-votacao-administrativo.component.html',
  styleUrls: ['./boletim-votacao-administrativo.component.scss']
})
export class BoletimVotacaoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      numBoletimVotacao: [''],
      dia: [''],
      mes: [''],
      ano: [''],
      ate: [''],
      descricaoDoAto: [''],
      file: [null]
    });

    this.dynamicFields = [
      { name: 'numBoletimVotacao', type: 'text', label: 'Nº Do boletim de votação' },
      { name: 'dia', type: 'text', label: 'Dia' },
      { name: 'mes', type: 'text', label: 'Mês' },
      { name: 'ano', type: 'text', label: 'Ano' },
      { name: 'ate', type: 'text', label: 'Até' },
      { name: 'descricaoDoAto', type: 'text', label: 'Descrição do Ato' },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
    ];
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        [fieldName]: file
      });
    }
  }

  onFormSubmit() {
    if (this.filtroForm.valid) {
      console.log(this.filtroForm.value);
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
    }
  }
}
