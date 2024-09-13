import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-rreo-rgf-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent],
  templateUrl: './rreo-rgf-administrativo.component.html',
  styleUrl: './rreo-rgf-administrativo.component.scss'
})
export class RreoRgfAdministrativoComponent {

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
      { name: 'tipoDeRelatorio', type: 'text', label: 'Tipo de relatório' },
      { name: 'anoDeReferencia', type: 'text', label: 'Ano de Referência' },
      { name: 'file', type: 'file', fileType: 'simple', label: 'anexo' },
      { name: 'período', type: 'text', label: 'Período' },
      { name: 'data', type: 'text', label: 'data' },
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
