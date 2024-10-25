import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-cotas-para-servico-parlamentar-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent],
  templateUrl: './cotas-para-servico-parlamentar-administrativo.component.html',
  styleUrl: './cotas-para-servico-parlamentar-administrativo.component.scss'
})
export class CotasParaServicoParlamentarAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      dataCota: [''],
      arquivo: ['']
    });

    this.dynamicFields = [
      { name: 'dataCota', type: 'date', label: 'Data da Cota' },
      { name: 'arquivo', type: 'file', fileType: 'complex', label: 'Arquivo' }

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
