import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
@Component({
  selector: 'app-carta-de-servicos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './carta-de-servicos-administrativo.component.html',
  styleUrl: './carta-de-servicos-administrativo.component.scss',
})
export class CartaDeServicosAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      horaAtividade: [''],
      description: [''],
      date: [''],
    });

    this.dynamicFields = [
      { name: 'carta', type: 'file', fileType: 'complex', label: 'Anexar Carta' }

    ];
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filtroForm.patchValue({
        [fieldName]: file,
      });
    }
  }

  onFormSubmit() {}
}
