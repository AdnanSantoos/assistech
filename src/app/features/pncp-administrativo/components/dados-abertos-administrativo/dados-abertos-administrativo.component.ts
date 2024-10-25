import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-dados-abertos-administrativo',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LayoutFormsAdmComponent,],
  templateUrl: './dados-abertos-administrativo.component.html',
  styleUrl: './dados-abertos-administrativo.component.scss'
})
export class DadosAbertosAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      adicionarLinkPaginaDados: [''],
      informacoesAdicionais: ['']

    });

    this.dynamicFields = [
      { name: 'adicionarLinkPaginaDados', type: 'text', label: 'Adicionar Link da Página de dados' },
      { name: 'informacoesAdicionais', type: 'textarea', label: 'Informações Adicionais' }

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
