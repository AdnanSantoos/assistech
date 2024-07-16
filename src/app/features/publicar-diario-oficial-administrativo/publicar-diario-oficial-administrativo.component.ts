import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-publicar-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent],
  templateUrl: './publicar-diario-oficial-administrativo.component.html',
  styleUrl: './publicar-diario-oficial-administrativo.component.scss'
})
export class PublicarDiarioOficialAdministrativoComponent {

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
      { name: 'titulo', type: 'text', label: 'titulo' },
      { name: 'descricao', type: 'textarea', label: 'Descrição' },
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
    console.log(this.filtroForm.value);
  }
}
