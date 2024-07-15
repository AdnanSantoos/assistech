import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-legislacao-municipal-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './legislacao-municipal-administrativo.component.html',
  styleUrl: './legislacao-municipal-administrativo.component.scss'
})
export class LegislacaoMunicipalAdministrativoComponent {
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
      { name: 'categoria', type: 'select', label: 'Categoria', options: [
        { value: 'categoria1', label: 'Categoria 1' },
        { value: 'categoria2', label: 'Categoria 2' },
        { value: 'categoria3', label: 'Categoria 3' }
      ]},
      { name: 'tipo', type: 'text', label: 'Tipo' },
      { name: 'numero', type: 'text', label: 'Número' },
      { name: 'ano', type: 'text', label: 'Ano' },
      { name: 'ementa', type: 'text', label: 'Ementa' },
      { name: 'legislacao', type: 'text', label: 'Legislação' },
      { name: 'numeroDoAto', type: 'text', label: 'Nº do Ato' },
      { name: 'dataAssinaturaPublicacaoPortal', type: 'text', label: 'Data de assinatura/publicação no portal' },
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
