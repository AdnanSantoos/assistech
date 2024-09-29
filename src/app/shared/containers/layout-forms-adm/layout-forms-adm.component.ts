import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormsComponent } from '../../components/forms/forms.component';
import { SidebarAdministrativoComponent } from '../../components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-layout-forms-adm',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsComponent, SidebarAdministrativoComponent, NavbarComponent, MatIcon],
  templateUrl: './layout-forms-adm.component.html',
  styleUrls: ['./layout-forms-adm.component.scss'],
})
export class LayoutFormsAdmComponent implements OnInit {
  @Input() dynamicFields: any[] = [];
  @Input() titulo_pagina: string | null = null;
  @Input() titulo_form: string | null = null;
  @Input() form!: FormGroup;
  @Output() formSubmit = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder, private location: Location) { }

  ngOnInit() {
    // Se o titulo_form estiver vazio ou nulo, atribuímos "Cadastrar" + titulo_pagina
    if (!this.titulo_form || this.titulo_form.trim() === '') {
      this.titulo_form = `Cadastrar ${this.titulo_pagina}`;
    }

    // Adicionando controles dinâmicos ao formulário
    this.dynamicFields.forEach((field) => {
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
        [fieldName]: file,
      });
      this.form.get(fieldName)?.updateValueAndValidity();
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(form: any) {
    this.formSubmit.emit(form);
  }
}
