import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-informacoes-sigilosas-administrativo',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,],
  templateUrl: './informacoes-sigilosas-administrativo.component.html',
  styleUrls: ['./informacoes-sigilosas-administrativo.component.scss']
})
export class InformacoesSigilosasAdministrativoComponent {

  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      grauSigilo: [''],
      data: [''],
      file: [''],
      description: ['']

    });

    this.dynamicFields = [
      { name: 'grauSigilo', type: 'text', label: 'Grau de Sigilo' },
      { name: 'description', type: 'textarea', label: 'Descrição' },
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