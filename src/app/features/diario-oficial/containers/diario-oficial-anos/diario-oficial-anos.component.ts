import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../diario-oficial-layout/diario-oficial-layout.component';

@Component({
  selector: 'app-diario-oficial-anos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule,
    DiarioOficialLayoutComponent
  ],
  templateUrl: './diario-oficial-anos.component.html',
  styleUrls: ['./diario-oficial-anos.component.scss']
})
export class DiarioOficialAnosComponent {
  filtroForm: FormGroup;
  anos: number[] = [];
  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.anos.push(year);
    }

    this.filtroForm = this.fb.group({
      ano: [currentYear],
      mes: ['Janeiro']
    });
  }

  onFormSubmit(): void {
    console.log(this.filtroForm.value);
    this.router.navigate(['/diario-oficial-listagem']);
  }

}
