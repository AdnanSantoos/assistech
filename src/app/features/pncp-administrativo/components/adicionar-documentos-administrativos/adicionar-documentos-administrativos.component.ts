import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-adicionar-documentos-administrativos',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent
  ],
  templateUrl: './adicionar-documentos-administrativos.component.html',
  styleUrls: ['./adicionar-documentos-administrativos.component.scss']
})

export class AdicionarDocumentosAdministrativosComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      tipo: [''],
      autoria: [''],
      numeroDescricao: [''],
      dataDocumento: [''],
      file: ['']
    });

    this.dynamicFields = [
      { name: 'tipo', type: 'text', label: 'Tipo' },
      { name: 'autoria', type: 'text', label: 'Autoria' },
      { name: 'numeroDescricao', type: 'text', label: 'Número/Descrição' },
      { name: 'dataDocumento', type: 'date', label: 'data do documento' },
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
