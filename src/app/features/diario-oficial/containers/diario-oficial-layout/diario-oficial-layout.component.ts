import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-diario-oficial-layout',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule],
  templateUrl: './diario-oficial-layout.component.html',
  styleUrl: './diario-oficial-layout.component.scss'
})
export class DiarioOficialLayoutComponent {
  filtroForm: FormGroup;
  anos: number[] = [];
  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  exibirFormulario: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.anos.push(year);
    }

    this.filtroForm = this.fb.group({
      ano: [currentYear],
      mes: ['Janeiro']
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.exibirFormulario = url === '/diario-oficial-listagem' || url === '/diario-oficial-visualizacao';
    });
  }

  onFormSubmit(): void {
    console.log(this.filtroForm.value);
  }
}
