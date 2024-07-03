import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-filtro-geral',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './filtro-geral.component.html',
  styleUrl: './filtro-geral.component.scss'
})
export class FiltroGeralComponent {
  filtroForm: FormGroup;

  @Output() filtroChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: ['']
    });
  }

  onFormSubmit() {
    this.filtroChange.emit(this.filtroForm.value);
  }
}