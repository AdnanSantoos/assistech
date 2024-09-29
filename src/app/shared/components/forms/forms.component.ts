import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatRippleModule } from '@angular/material/core';

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
  @Input() dynamicFields: any[] = [];
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  nameFile: string | null = null;
  isEditing: boolean = false;

  selectedFiles: File[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.form = this.fb.group({});
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.dynamicFields.forEach((field) => {
      if (field.type === 'file' && field.fileType === 'simple') {
        this.form.addControl(field.name, this.fb.control(null));
      } else if (field.type === 'checkbox') {
        this.form.addControl(field.name, this.fb.control(false));
      } else {
        this.form.addControl(field.name, this.fb.control(''));
      }
    });
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFiles = [file];
      this.nameFile = file.name;
      this.form.patchValue({
        [fieldName]: this.selectedFiles,
      });
      this.form.get(fieldName)?.updateValueAndValidity();
    } else {
      alert('Apenas arquivos PDF são permitidos.');
    }
  }

  editFile() {
    this.fileInput.nativeElement.click();
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length === 0) {
      this.nameFile = null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = { ...this.form.value };

      // Convertendo a data para o formato ISO
      Object.keys(formData).forEach((key) => {
        if (this.form.get(key)?.value instanceof Date) {
          formData[key] = this.form.get(key)?.value.toISOString();
        }
      });

      console.log('Dados do formulário enviados:', formData);
      this.formSubmit.emit(formData);
    }
  }
}
