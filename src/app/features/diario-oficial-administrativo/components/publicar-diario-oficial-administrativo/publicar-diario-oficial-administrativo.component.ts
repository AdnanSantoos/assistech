import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicarDiarioOficialService } from '../../services/publicar-diario-oficial.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { LogPipe } from '../../../../shared/pipes/log.pipe';
import { PublicarDiarioOficialMapper } from '../../mappers/publicar-diario-oficial-mapper';

@Component({
  selector: 'app-publicar-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LogPipe,
    LayoutFormsAdmComponent],
  templateUrl: './publicar-diario-oficial-administrativo.component.html',
  styleUrls: ['./publicar-diario-oficial-administrativo.component.scss']
})
export class PublicarDiarioOficialAdministrativoComponent implements OnInit {
  filtroForm: FormGroup = this.fb.group({});;
  dynamicFields: any[] = [
    { name: 'title', type: 'text', label: 'Título' },
    { name: 'description', type: 'textarea', label: 'Descrição' },
    { name: 'date', type: 'date', label: 'Data' },
    { name: 'files', type: 'file', fileType: 'complex', label: 'Arquivo' }
  ];

  constructor(
    private fb: FormBuilder,
    private _publicarService: PublicarDiarioOficialService
  ) {
    this.dynamicFields.forEach((field) => {
      if (field.type === 'file') {
        this.filtroForm.addControl(field.name, this.fb.control(null));
      } else if (field.type === 'checkbox') {
        this.filtroForm.addControl(field.name, this.fb.control(false));
      } else {
        this.filtroForm.addControl(field.name, this.fb.control('', field.required ? Validators.required : null));
      }
    });
  }

  ngOnInit() {
   
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];    
    const reader = new FileReader();
    reader.onload = () => {
      this.filtroForm.patchValue({
        [fieldName]: reader.result,
      });
      this.filtroForm.get(fieldName)?.updateValueAndValidity();
    };
    reader.readAsArrayBuffer(file);
  }

  onFormSubmit(form:any) {
    this._publicarService.publicarDiarioOficial(PublicarDiarioOficialMapper.toSubmit(form));
  }
}