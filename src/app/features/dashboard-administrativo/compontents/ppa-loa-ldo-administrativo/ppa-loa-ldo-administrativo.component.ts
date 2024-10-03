import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';

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
  uploadedFilesPPA: File[] = [];
  uploadedFilesLDO: File[] = [];
  uploadedFilesLOA: File[] = [];

  constructor(private fb: FormBuilder, private location: Location) {
    this.ppaForm = this.fb.group({
      data: [''],
      descricao: [''],
      fileSimple: [null],
    });

    this.ldoForm = this.fb.group({
      data: [''],
      descricao: [''],
      fileSimple: [null],
    });

    this.loaForm = this.fb.group({
      data: [''],
      descricao: [''],
      fileSimple: [null],
    });
  }

  onFormSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
    }
  } 
  goBack(): void {
    this.location.back();
  }

  onFileChange(event: any, form: FormGroup, fileField: string) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') { // Verifica se é um PDF
      form.get(fileField)?.setValue(file);

      // Adicionar arquivo à tabela de anexos
      if (form === this.ppaForm) {
        this.uploadedFilesPPA.push(file);
      } else if (form === this.ldoForm) {
        this.uploadedFilesLDO.push(file);
      } else if (form === this.loaForm) {
        this.uploadedFilesLOA.push(file);
      }
    } else {
      alert('Apenas arquivos PDF são permitidos.');
    }
  }


  removeFile(file: File) {
    this.uploadedFilesPPA = this.uploadedFilesPPA.filter(f => f !== file);
    this.uploadedFilesLDO = this.uploadedFilesLDO.filter(f => f !== file);
    this.uploadedFilesLOA = this.uploadedFilesLOA.filter(f => f !== file);
  }
}
