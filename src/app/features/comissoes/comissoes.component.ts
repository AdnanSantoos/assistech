import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comissoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comissoes.component.html',
  styleUrl: './comissoes.component.scss'
})
export class ComissoesComponent {
  comissoes = [
    {
      comissao: 'COMISSÃO DE ECONOMIAS E FINANÇAS',
      items: [
        { presidente: 'João Silva', relator: 'Maria Oliveira', membro: 'Carlos Souza', competencia: 'Análise de finanças públicas' },
        { presidente: 'João Silva', relator: 'Maria Oliveira', membro: 'Carlos Souza', competencia: 'Orçamento público' },
        { presidente: 'João Silva', relator: 'Maria Oliveira', membro: 'Carlos Souza', competencia: 'Contabilidade governamental' },
        { presidente: 'João Silva', relator: 'Maria Oliveira', membro: 'Carlos Souza', competencia: 'Políticas fiscais' },
        { presidente: 'João Silva', relator: 'Maria Oliveira', membro: 'Carlos Souza', competencia: 'Planejamento financeiro' }
      ]
    },
    {
      comissao: 'COMISSÃO DE SAÚDE',
      items: [
        { presidente: 'Ana Paula', relator: 'Pedro Lima', membro: 'Rita Santos', competencia: 'Supervisão de políticas de saúde pública' },
        { presidente: 'Ana Paula', relator: 'Pedro Lima', membro: 'Rita Santos', competencia: 'Epidemiologia' },
        { presidente: 'Ana Paula', relator: 'Pedro Lima', membro: 'Rita Santos', competencia: 'Gestão de crises sanitárias' },
        { presidente: 'Ana Paula', relator: 'Pedro Lima', membro: 'Rita Santos', competencia: 'Políticas de prevenção' },
        { presidente: 'Ana Paula', relator: 'Pedro Lima', membro: 'Rita Santos', competencia: 'Acesso universal à saúde' }
      ]
    }
  ];

  toRomanNumerals(num: number): string {
    const romanNumerals: any = {
      1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
    };

    return romanNumerals[num];
  }
}
