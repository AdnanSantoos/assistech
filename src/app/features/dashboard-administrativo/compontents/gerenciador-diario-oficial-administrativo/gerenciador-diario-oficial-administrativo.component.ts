import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-gerenciador-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, TooltipModule],
  templateUrl: './gerenciador-diario-oficial-administrativo.component.html',
  styleUrls: ['./gerenciador-diario-oficial-administrativo.component.scss'],
})
export class GerenciadorDiarioOficialAdministrativoComponent {
  constructor(private location: Location) { }

  // Exemplo de documentos (substitua com seus dados reais)
  documents = [
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '02/07/2024', edition: 'II/254', file: 'PORTARIA N 26-2024', status: 'PENDENTE' },
    { date: '03/07/2024', edition: 'II/255', file: 'PORTARIA N 27-2024', status: 'PUBLICADO' },
    { date: '04/07/2024', edition: 'II/256', file: 'PORTARIA N 28-2024', status: 'EM ANÁLISE' },
  ];

  // Dados de paginação
  currentPage = 1;
  totalPages = 5;

  goBack(): void {
    this.location.back();
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
