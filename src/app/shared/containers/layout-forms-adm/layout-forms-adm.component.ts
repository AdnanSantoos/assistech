import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsComponent } from './../../components/forms/forms.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-layout-forms-adm',
  standalone: true,
  imports: [CommonModule, FormsComponent],
  templateUrl: './layout-forms-adm.component.html',
  styleUrls: ['./layout-forms-adm.component.scss']
})
export class LayoutFormsAdmComponent implements OnInit {
  @Input() dynamicFields: any[] = [];
  @Input() titulo_pagina: string | null = null;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    this.dynamicFields.forEach(field => {
      if (field.type === 'file') {
        this.form.addControl(field.name, this.fb.control(null));
      } else {
        this.form.addControl(field.name, this.fb.control(''));
      }
    });
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        [fieldName]: file
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
