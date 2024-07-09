import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-estrutura-organizacional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estrutura-organizacional.component.html',
  styleUrl: './estrutura-organizacional.component.scss'
})
export class EstruturaOrganizacionalComponent {
  outrosItens = [
    { titulo: 'Mesa Diretora', subItens: [] },
    { titulo: 'Organograma', subItens: [] },
    { titulo: 'Regimento Interno', subItens: [] },
    { titulo: 'Unidades da Estrutura Organizacional', subItens: [] },
    { titulo: 'Vereadores', subItens: [] }
  ];

  atendimentoPublico = [
    'Endereço: Praça Licurgo Peixoto – 126 – Centro (Beira Rio)',
    'Fone: (91) 98346-2313 | 99242-8852',
    'Horário de Atendimento: De segunda à sexta das 08:00hs às 12:00hs'
  ];
}
