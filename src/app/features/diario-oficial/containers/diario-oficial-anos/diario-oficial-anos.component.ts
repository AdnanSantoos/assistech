import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiarioOficialLayoutComponent } from '../diario-oficial-layout/diario-oficial-layout.component';
import { DadosDiarioOficialPublico } from '../../models/diario-oficial.model';
import { DiarioOficialService } from '../../services/diario-oficial.service';

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
  meses: string[] = [];
  diarioData!: DadosDiarioOficialPublico[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private diarioOficialService: DiarioOficialService
  ) {
    this.filtroForm = this.fb.group({
      ano: [new Date().getFullYear()],
      mes: ['']
    });

    this.diarioOficialService.getDiarioPublico().subscribe({
      next: (data) => {
        const diarioData = data.data;
        this.diarioData = [diarioData];
        this.initializeAnos();
        this.onAnoChange(this.filtroForm.value.ano);
      },
      error: (err) => console.log(err)
    });
  }

  private initializeAnos(): void {
    const anos = this.diarioData.map(d => d.year);
    this.anos = [...new Set(anos)];
  }

  private onAnoChange(selectedAno: number): void {
    const publicacoes = this.diarioData.filter(d => d.year === selectedAno);
    this.meses = publicacoes.map(d => d.first_publication);
  }

  onFormSubmit(): void {
    console.log(this.filtroForm.value);
    this.router.navigate(['/diario-oficial-listagem']);
  }
}
