import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiarioOficial } from './models/diario-oficial.model';
import { DiarioOficialService } from './services/diario-oficial.service';
@Component({
  selector: 'app-diario-oficial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './diario-oficial.component.html',
  styleUrl: './diario-oficial.component.scss'
})
export class DiarioOficialComponent implements OnInit {
  button = [
    {
      name: '2022',
      link: '/diario-oficial-anos'
    },
    {
      name: '2023',
      link: '/diario-oficial-anos'
    },
    {
      name: '2024',
      link: '/diario-oficial-anos'
    },
  ];
  noticias: DiarioOficial[] = [];
  diario: any;

  constructor(private diarioOficialService: DiarioOficialService) {}

  ngOnInit(): void {
    this.diarioOficialService.getDiarioPublicacoes().subscribe(
      (data) => {
        this.noticias = data;
        console.log('Notícias recebidas:', this.noticias);
      },
      (error) => {
        console.error('Erro ao buscar notícias:', error);
      }
    );

    this.diarioOficialService.getDiario().subscribe(
      (data) => {
        this.diario = data;
        console.log('Diário Oficial:', this.diario);
      },
      (error) => {
        console.error('Erro ao buscar diário oficial:', error);
      }
    );

    this.diarioOficialService.getDiarioPublicoOficial().subscribe(
      (data) => {
        console.log('Diário Público Oficial:', data);
      },
      (error) => {
        console.error('Erro ao buscar diário público oficial:', error);
      }
    );

    this.diarioOficialService.getDiarioPublico().subscribe(
      (data) => {
        console.log('Diário Público:', data);
      },
      (error) => {
        console.error('Erro ao buscar diário público:', error);
      }
    );

    this.diarioOficialService.getDiarioPublicoEntidade().subscribe(
      (data) => {
        console.log('Diário Público Entidade:', data);
      },
      (error) => {
        console.error('Erro ao buscar diário público entidade:', error);
      }
    );
  }
}
