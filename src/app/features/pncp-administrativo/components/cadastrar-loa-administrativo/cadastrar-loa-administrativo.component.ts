import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-cadastrar-loa-administrativo',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,],
  templateUrl: './cadastrar-loa-administrativo.component.html',
  styleUrls: ['./cadastrar-loa-administrativo.component.scss']
})
export class CadastrarLoaAdministrativoComponent {


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
      { name: 'titulo', type: 'text', label: 'Título' },
      { name: 'description', type: 'textarea', label: 'Dispõe Sobre' },
      { name: 'data', type: 'date', label: 'data' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'arquivo' }


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
