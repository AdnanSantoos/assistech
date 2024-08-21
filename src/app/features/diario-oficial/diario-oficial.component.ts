import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiarioOficialService } from './services/diario-oficial.service';
import { DiarioOficialPublico } from './models/diario-oficial.model';
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
  listaAnos!: number[];

  constructor(private diarioOficialService: DiarioOficialService) { }

  ngOnInit(): void {
    this.diarioOficialService.getDiarioPublico().subscribe({
      next: (value: DiarioOficialPublico) => {
        this.listaAnos = this.gerarAnosAteAtual(value.data.year)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  gerarAnosAteAtual(anoInicial: number) {
    const anoAtual = new Date().getFullYear();
    let anos = [];
    for (let ano = anoInicial; ano <= anoAtual; ano++) {
      anos.push(ano);
    }
    return anos;
  }
}
