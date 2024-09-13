import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DadosDiarioOficialPublico } from '../../models/diario-oficial.model';
import { DiarioOficialService } from '../../services/diario-oficial.service';
import { selectModel } from '../../../../shared/models/shared.model';

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
  ],
  templateUrl: './diario-oficial-anos.component.html',
  styleUrls: ['./diario-oficial-anos.component.scss']
})
export class DiarioOficialAnosComponent {
  filtroForm: FormGroup;
  anos: number[] = [];
  meses:selectModel[] = [
    { key: "Janeiro", value: 1 },
    { key: "Fevereiro", value: 2 },
    { key: "Março", value: 3 },
    { key: "Abril", value:4 },
    { key: "Maio", value: 5 },
    { key: "Junho", value: 6 },
    { key: "Julho", value: 7 },
    { key: "Agosto", value: 8 },
    { key: "Setembro", value: 9 },
    { key: "Outubro", value: 10 },
    { key: "Novembro", value: 11 },
    { key: "Dezembro", value: 12 }
  ]
  diarioData!: DadosDiarioOficialPublico[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private diarioOficialService: DiarioOficialService
  ) {
    this.filtroForm = this.fb.group({
      content: [null],
      year: [null],
      month: []
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
  }

  onFormSubmit(): void {
    // Chamada para o serviço que faz a requisição ao backend
    this.diarioOficialService.getDiarioPublicoPorData(this.filtroForm.value).subscribe((data) => {
      console.log('data:',data)
      // Navega para a rota de listagem, passando os dados como state
      this.router.navigate(['/diario-oficial/listagem'], { state: { resultados: data } });
    });
  }
}
