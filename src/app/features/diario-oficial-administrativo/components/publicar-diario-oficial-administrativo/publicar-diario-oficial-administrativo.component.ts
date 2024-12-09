import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicarDiarioOficialService } from '../../services/publicar-diario-oficial.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { LogPipe } from '../../../../shared/pipes/log.pipe';
import { PublicarDiarioOficialMapper } from '../../mappers/publicar-diario-oficial-mapper';
import { dynamicFields } from '../../../../shared/models/shared.model';

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
  filtroForm: FormGroup = this.fb.group({});
  dynamicFields: dynamicFields[] = [
    { name: 'date', type: 'date', label: 'Data', required: true,value:new Date(),disabled:true },
    { name: 'description', type: 'textarea', label: 'Descrição', required: true },
    { name: 'files', type: 'file', fileType: 'complex', label: 'Arquivo', required: true }
  ];

  constructor(
    private fb: FormBuilder,
    private _publicarService: PublicarDiarioOficialService
  ) {
    this.dynamicFields.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'file') {
        this.filtroForm.addControl(field.name, this.fb.control(null, validators));
      } else if (field.type === 'checkbox') {
        this.filtroForm.addControl(field.name, this.fb.control(false, validators));
      }else if (field.type === 'date') {
        this.filtroForm.addControl(field.name, this.fb.control({value:new Date(),disabled:true}, validators));
      }
       else {
        this.filtroForm.addControl(field.name, this.fb.control('teste', validators));
      }
    });
  }


  ngOnInit() { }

  onFormSubmit(event: any) {
    const formData = PublicarDiarioOficialMapper.toSubmit(event);
    this._publicarService.publicarDiarioOficial(formData);
  }

}
