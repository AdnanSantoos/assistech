import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormsComponent } from '../../components/forms/forms.component';

@Component({
  selector: 'app-layout-forms-adm',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsComponent],
  templateUrl: './layout-forms-adm.component.html',
  styleUrls: ['./layout-forms-adm.component.scss']
})
export class LayoutFormsAdmComponent implements OnInit {
  @Input() dynamicFields: any[] = [];
  @Input() titulo_pagina: string | null = null;
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dynamicFields.forEach(field => {
      if (!this.form.contains(field.name)) {
        if (field.type === 'file') {
          this.form.addControl(field.name, this.fb.control(null));
        } else {
          this.form.addControl(field.name, this.fb.control(''));
        }
      }
    });
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({
        [fieldName]: file
      });
      this.form.get(fieldName)?.updateValueAndValidity();
    } else {
      console.error("Nenhum arquivo foi selecionado.");
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit();
    } else {
      console.error('Formulário inválido');
    }
  }
}
