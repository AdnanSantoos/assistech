import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(private fb: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.form = this.fb.group({});
    this.dateAdapter.setLocale('pt-BR'); // Configura a localidade para pt-BR
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

    console.log('Arquivo selecionado:', file);

    const validFileTypes = ['application/pdf'];
    if (!validFileTypes.includes(file.type)) {
      console.error('Tipo de arquivo inválido');
      return;
    }

    const maxSizeInMB = 100;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      console.error('Tamanho do arquivo excede o limite permitido');
      return;
    }

    this.form.patchValue({
      [fieldName]: file,
    });

    this.form.get(fieldName)?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Dados do formulário:', this.form.value);

      this.formSubmit.emit();
    } else {
      console.warn('O formulário não é válido. Verifique os campos.');
    }
  }
}
