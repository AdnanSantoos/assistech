import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  @Input() dynamicFields: any[] = [];
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
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

    // Log do arquivo para depuração
    console.log('Arquivo selecionado:', file);

    // Validação do tipo de arquivo
    const validFileTypes = ['application/pdf']; // Atualize conforme necessário
    if (!validFileTypes.includes(file.type)) {
      console.error('Tipo de arquivo inválido');
      return;
    }

    // Validação do tamanho do arquivo
    const maxSizeInMB = 100;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      console.error('Tamanho do arquivo excede o limite permitido');
      return;
    }

    // Se todas as validações forem aprovadas, adicione o arquivo ao formulário
    this.form.patchValue({
      [fieldName]: file
    });

    this.form.get(fieldName)?.updateValueAndValidity();
  }



  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit();
    }
  }
}
