import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DiarioOficialService } from '../../services/diario-oficial.service';
import { DadosDiarioOficialPublico } from '../../models/diario-oficial.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-diario-oficial-layout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterLink,
    MatButtonModule,
    RouterModule,
],
  templateUrl: './diario-oficial-layout.component.html',
  styleUrls: ['./diario-oficial-layout.component.scss']
})
export class DiarioOficialLayoutComponent implements OnInit {
  filtroForm: FormGroup;
  anos: number[] = [];
  meses: string[] = [];
  diarioData: DadosDiarioOficialPublico | undefined;
  exibirFormulario: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private diarioOficialService: DiarioOficialService,
    private location: Location
  ) {
    this.filtroForm = this.fb.group({
      ano: [new Date().getFullYear()],
      mes: ['']
    });
  }

  ngOnInit(): void {
    this.diarioOficialService.getDiarioPublico().subscribe({
      next: (response) => {
        this.diarioData = response.data;
        this.initializeAnos();
        this.onAnoChange(this.filtroForm.value.ano);
      },
      error: (err) => console.log(err)
    });

    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.exibirFormulario = url === '/diario-oficial-listagem' || url === '/diario-oficial-visualizacao';
    });
  }

  initializeAnos(): void {
    if (this.diarioData) {
      this.anos = [this.diarioData.year];
    }
  }

  onAnoChange(selectedAno: number): void {
    if (this.diarioData && this.diarioData.year === selectedAno) {
      this.meses = [this.diarioData.first_publication];
    } else {
      this.meses = [];
    }
  }

  onFormSubmit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
