import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-agenda-presidente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agenda-presidente.component.html',
  styleUrl: './agenda-presidente.component.scss'
})
export class AgendaPresidenteComponent {
  agenda = [
    {
      month: 'JULHO',
      items: [
        { date: '05/07/2024', description: 'INAUGURAÇÃO' },
        { date: '04/07/2024', description: 'SESSÃO ORDINÁRIA' },
        { date: '03/07/2024', description: 'ATENDIMENTO GABINETE ITINERANTE ZONA RURAL' },
        { date: '02/07/2024', description: 'IDERFLOR, SEEL' },
        { date: '01/07/2024', description: 'ACOMPANHANDO SERVIÇOS DA OPERAÇÃO VERÃO NAS VICINAIS' },
      ]
    },
    {
      month: 'JUNHO',
      items: [
        { date: '28/06/2024', description: 'SESSÃO ORDINÁRIA' },
        { date: '27/06/2024', description: 'ATENDIMENTO GABINETE ITINERANTE' },
        { date: '26/06/2024', description: 'ACOMPANHAR E FISCALIZAR TRABALHOS DAS ESTRADAS DO TATUAIÁ' },
        { date: '25/06/2024', description: 'ACOMPANHAR E FISCALIZAR TRABALHOS DE MANUTENÇÃO DE ESTRADAS DO MURAIUTEUA' },
        { date: '24/06/2024', description: 'ACOMPANHANDO O PREFEITO NA ZONA RURAL' },
      ]
    }
  ];
}
