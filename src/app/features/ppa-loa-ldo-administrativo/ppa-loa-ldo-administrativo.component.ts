import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-ppa-loa-ldo-administrativo',
  standalone: true,
  imports: [LayoutFormsAdmComponent, CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './ppa-loa-ldo-administrativo.component.html',
  styleUrls: ['./ppa-loa-ldo-administrativo.component.scss']
})
export class PpaLoaLdoAdministrativoComponent {

  ppaForm: FormGroup;
  ldoForm: FormGroup;
  loaForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.ppaForm = this.createForm();
    this.ldoForm = this.createForm();
    this.loaForm = this.createForm();

    this.dynamicFields = [
      { name: 'data', type: 'text', label: 'DATA' },
      { name: 'descricao', type: 'text', label: 'descrição' },
      { name: 'fileSimple', type: 'file', fileType: 'complex' }
    ];
  }

  createForm(): FormGroup {
    return this.fb.group({});
  }

  onFileChange(event: any, form: FormGroup, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      form.patchValue({
        [fieldName]: file
      });
    }
  }

  onFormSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
