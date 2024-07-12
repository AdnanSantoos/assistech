import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-atas-sessao-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './atas-sessao-administrativo.component.html',
  styleUrls: ['./atas-sessao-administrativo.component.scss']
})
export class AtasSessaoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: ['']
    });

    this.dynamicFields = [
      { name: 'ataDaSessao', type: 'text', label: 'Ata da Sessão' },
      { name: 'day', type: 'text', label: 'Dia' },
      { name: 'month', type: 'text', label: 'Mês' },
      { name: 'year', type: 'text', label: 'Ano' }
    ];
  }

  onFormSubmit() {
    console.log(this.filtroForm.value);
  }
}
