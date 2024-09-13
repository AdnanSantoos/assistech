import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-gerenciador-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciador-diario-oficial-administrativo.component.html',
  styleUrl: './gerenciador-diario-oficial-administrativo.component.scss'
})
export class GerenciadorDiarioOficialAdministrativoComponent {
  constructor(  private location: Location){}
  documents = [
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
    { date: '01/07/2024', edition: 'II/253', file: 'PORTARIA N 25-2024', status: 'PUBLICADO' },
  ];
  goBack(): void {
    this.location.back();
  }
}
