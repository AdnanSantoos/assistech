import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
@Component({
  selector: 'app-adicionar-orgao-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './adicionar-orgao-administrativo.component.html',
  styleUrl: './adicionar-orgao-administrativo.component.scss',
})
export class AdicionarOrgaoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      cnpj: [''],
    });

    this.dynamicFields = [
      { name: 'cnpj', type: 'text', label: 'cnpj' },
    ];
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filtroForm.patchValue({
        [fieldName]: file
      });
    }
  }

  onFormSubmit() {
    console.log(this.filtroForm.value);
  }
}
