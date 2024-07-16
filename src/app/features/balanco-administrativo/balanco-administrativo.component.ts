import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-balanco-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './balanco-administrativo.component.html',
  styleUrls: ['./balanco-administrativo.component.scss']
})
export class BalancoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      tipoDeBalanco: [''],
      nome: [''],
      mes: [''],
      ano: [''],
      file: [null]
    });

    this.dynamicFields = [
      { name: 'tipoDeBalanco', type: 'text', label: 'Tipo de balanço' },
      { name: 'nome', type: 'text', label: 'Nome' },
      { name: 'mes', type: 'text', label: 'Mês' },
      { name: 'ano', type: 'text', label: 'Ano' },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
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
