import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
@Component({
  selector: 'app-agenda-do-presidente-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './agenda-do-presidente-administrativo.component.html',
  styleUrl: './agenda-do-presidente-administrativo.component.scss',
})
export class AgendaDoPresidenteAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      horaAtividade: [''],
      description: [''],
      date: [''],

    });

    this.dynamicFields = [
      { name: 'horaAtividade', type: 'text', label: 'hora da atividade' },
      { name: 'description', type: 'textarea', label: 'Descrição da atividade' },
      { name: 'date', type: 'date', label: 'Data' }

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
