import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-boletim-votacao-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './boletim-votacao-administrativo.component.html',
  styleUrl: './boletim-votacao-administrativo.component.scss'
})
export class BoletimVotacaoAdministrativoComponent {
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
      { name: 'numBoletimVotacao', type: 'text', label: 'Nº Do boletim de votação' },
      { name: 'dia', type: 'text', label: 'Dia' },
      { name: 'mes', type: 'text', label: 'Mês' },
      { name: 'ano', type: 'text', label: 'Ano' },
      { name: 'ate', type: 'text', label: 'Até' },
      { name: 'descricaoDoAto', type: 'text', label: 'Descrição do Ato' },

      { name: 'file', type: 'file', label: '' }
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
