import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicarDiarioOficialService } from './services/publicar-diario-oficial.service';
import { PublicarDiarioOficialModel } from './models/publicar-diario-oficial.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-publicar-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent],
  templateUrl: './publicar-diario-oficial-administrativo.component.html',
  styleUrl: './publicar-diario-oficial-administrativo.component.scss'
})
export class PublicarDiarioOficialAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[] = [
    { name: 'titulo', type: 'text', label: 'Título' },
    { name: 'descricao', type: 'textarea', label: 'Descrição' },
    { name: 'data', type: 'text', label: 'Data' },
    { name: 'file', type: 'file', fileType: 'complex', label: 'Arquivo' }
  ];

  constructor(
    private fb: FormBuilder,
    private _publicarService: PublicarDiarioOficialService
  ) {
    this.filtroForm = this.fb.group({});
  }

  ngOnInit() {
    this.dynamicFields.forEach((field) => {
      if (field.type === 'file' && field.fileType === 'simple') {
        this.filtroForm.addControl(field.name, this.fb.control(null));
      } else if (field.type === 'checkbox') {
        this.filtroForm.addControl(field.name, this.fb.control(false));
      } else {
        this.filtroForm.addControl(field.name, this.fb.control(''));
      }
    });
  }

  onFormSubmit() {
    if (this.filtroForm.valid) {
      const formValue = this.filtroForm.value;
      this._publicarService.publicarDiarioOficial(formValue);
    } else {
      console.error('Formulário inválido');
    }
  }
}
