import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
@Component({
  selector: 'app-ouvidoria-administrativo', 
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,],
  templateUrl: './ouvidoria-administrativo.component.html',
  styleUrls: ['./ouvidoria-administrativo.component.scss']
})
export class OuvidoriaAdministrativoComponent {


  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      titulo: [''],
      data: [''],
      file: [''],
      description: ['']

    });

    this.dynamicFields = [
      { name: 'informeDadosOuvidoria', type: 'textarea', label: 'Informe dados sobre a ouvidoria' },
      { name: 'data', type: 'date', label: 'data', page:'ouvidoria' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'arquivo...' }

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
