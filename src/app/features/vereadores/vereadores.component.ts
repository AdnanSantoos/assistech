import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vereadores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vereadores.component.html',
  styleUrl: './vereadores.component.scss'
})
export class VereadoresComponent {
  vereadores = [
    {
      month: 'JULHO',
      items: [
        {nome: 'Ana Domingas Pontes de Almeida' },
        {nome: 'Cláudio Castelo Branco de Sousa Junior' },
        {nome: 'José Gleison da Silva Conceicão' },
        {nome: 'Ozeias Freitas Correa' },
        {nome: 'Rosivaldo Barbosa de Lima' },
        {nome: 'Antonio Isomar dos Santos Soares' },
        {nome: 'Amilton Leocádio dos Santos' },
        {nome: 'Robson Mafra Carvalho' },
        {nome: 'José da Silva Ferreira' },
        {nome: 'José Erisvaldo Juca da Silva' },
        {nome: 'Alailson de Moura Santos' },
        {nome: 'Oliomar Roberto dos Santos' },
        {nome: 'Edinelson Alves da Silva' },
        {nome: 'Marcos Diego Neves Pereira' }
      ]
    }
  ];
}
