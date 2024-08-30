// src/app/components/publicar-diario-oficial-administrativo/publicar-diario-oficial-administrativo.component.ts
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
  dynamicFields!: any[];

  constructor(
    private fb: FormBuilder,
    private _publicarService: PublicarDiarioOficialService
  ) {
    this.filtroForm = this.fb.group({
      ataDaSessao: ['', Validators.required],
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      file: [null, Validators.required]
    });
    this.dynamicFields = [
      { name: 'titulo', type: 'text', label: 'titulo' },
      { name: 'descricao', type: 'textarea', label: 'Descrição' },
      { name: 'data', type: 'text', label: 'data' },
      { name: 'file', type: 'file', fileType: 'complex', label: '' }
    ];
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file
      });
    }
  }

  onFormSubmit() {
    if (this.filtroForm.valid) {
      const formValue: PublicarDiarioOficialModel = this.filtroForm.value;
      this._publicarService.publicarDiarioOficial(formValue);
    } else {
      console.error('Formulário inválido');
    }
  }
}
