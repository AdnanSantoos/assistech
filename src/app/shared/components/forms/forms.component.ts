import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatRippleModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dynamicFields } from '../../models/shared.model';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatRippleModule,
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class FormsComponent implements OnInit {
  @Input() dynamicFields: dynamicFields[] = [];
  @Input() form!: FormGroup;
  @Input() formAgendado!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  nameFile: string | null = null;
  isEditing: boolean = false;
  isTargetRoute: boolean = false;
  selectedFiles: File[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFilesMap: { [key: string]: File[] } = {}; // Mapeia os arquivos por campo

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>, private router: Router,
    private route: ActivatedRoute) {
    this.form = this.fb.group({});
    this.formAgendado = this.fb.group({
      file: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl(''),
    });
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.dynamicFields.forEach((field) => {
      if (field.type === 'file' && field.fileType === 'simple') {
        this.form.addControl(field.name, this.fb.control({ value: field.value ? field.value : null, disabled: field.disabled ? field.disabled : false }));
      } else if (field.type === 'checkbox') {
        this.form.addControl(field.name, this.fb.control({ value: field.value ? field.value : false, disabled: field.disabled ? field.disabled : false }));
      } else {
        this.form.addControl(field.name, this.fb.control({ value: field.value ? field.value : '', disabled: field.disabled ? field.disabled : false }));
      }
    });
    this.isTargetRoute = this.router.url === '/adm/diario-oficial-administrativo/publicar';

  }

  onFileChange(event: any, fieldName: string) {
    const files = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Verifica se o arquivo é PDF e não está duplicado
        if (
          file.type === 'application/pdf' &&
          !this.selectedFilesMap[fieldName]?.some(f => f.name === file.name)
        ) {
          validFiles.push(file);
        } else if (file.type !== 'application/pdf') {
          invalidFiles.push(file.name);
        }
      }

      // Inicializa a lista caso ainda não exista
      if (!this.selectedFilesMap[fieldName]) {
        this.selectedFilesMap[fieldName] = [];
      }

      // Adiciona arquivos válidos
      if (validFiles.length > 0) {
        this.selectedFilesMap[fieldName].push(...validFiles);
        this.form.patchValue({
          [fieldName]: this.selectedFilesMap[fieldName],
        });
        this.form.get(fieldName)?.updateValueAndValidity();
      }

      // Alerta para arquivos inválidos
      if (invalidFiles.length > 0) {
        alert(`Os seguintes arquivos não são PDFs ou estão duplicados: ${invalidFiles.join(', ')}`);
      }
    }
  }

  removeFile(fieldName: string, index: number): void {
    if (this.selectedFilesMap[fieldName]) {
      this.selectedFilesMap[fieldName].splice(index, 1);
      if (this.selectedFilesMap[fieldName].length === 0) {
        delete this.selectedFilesMap[fieldName];
      }

      // Atualiza o formulário
      this.form.patchValue({
        [fieldName]: this.selectedFilesMap[fieldName] || [],
      });
      this.form.get(fieldName)?.updateValueAndValidity();
    }
  }


  onFileChangeAgendado(event: any, fieldName: string) {
    const files = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];


    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      }

      if (validFiles.length > 0) {
        this.selectedFiles = validFiles;
        this.nameFile = validFiles.map(file => file.name).join(', ');
        this.formAgendado.controls['file'].setValue(this.selectedFiles)
        this.formAgendado.get(fieldName)?.updateValueAndValidity();
      }

      if (invalidFiles.length > 0) {
        alert(`Os seguintes arquivos não são PDFs e foram ignorados: ${invalidFiles.join(', ')}`);
      }
    }
  }

  viewFile(file: File) {
    const fileURL = URL.createObjectURL(file);
    const newWindow = window.open(fileURL, '_blank');

    if (newWindow) {
      const interval = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(interval);
        }
      }, 500);
    }
  }



  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.getRawValue() };

      // Convertendo a data para o formato ISO
      Object.keys(formData).forEach((key) => {
        if (this.form.get(key)?.value instanceof Date) {
          formData[key] = this.form.get(key)?.value.toISOString();
        }
      });

      this.formSubmit.emit(formData);
    }
  }
  onSubmitAgendado() {
    console.log(this.formAgendado)
    if (this.formAgendado.valid) {
      const formData = { ...this.form.getRawValue() };

      // Convertendo a data para o formato ISO
      Object.keys(formData).forEach((key) => {
        if (this.formAgendado.get(key)?.value instanceof Date) {
          formData[key] = this.formAgendado.get(key)?.value.toISOString();
        }
      });

      this.formSubmit.emit(formData);
    }
  }
}
