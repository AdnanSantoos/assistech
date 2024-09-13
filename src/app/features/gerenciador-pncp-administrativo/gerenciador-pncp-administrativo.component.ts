import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gerenciador-pncp-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './gerenciador-pncp-administrativo.component.html',
  styleUrl: './gerenciador-pncp-administrativo.component.scss',
})
export class GerenciadorPncpAdministrativoComponent {
  constructor(private location: Location) {}
  documents = [
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
    {
      numSeq: '1',
      contratoPNCP: '002/2024',
      numProc: '002',
      orgao: 'camara de itaberaba',
    },
  ];

  goBack(): void {
    this.location.back();
  }
}
