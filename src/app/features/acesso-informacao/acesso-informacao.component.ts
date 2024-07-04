import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acesso-informacao',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent,RouterLink],
  templateUrl: './acesso-informacao.component.html',
  styleUrl: './acesso-informacao.component.scss'
})
export class AcessoInformacaoComponent {
  button = [
    {
      name: 'Ata das sessões',
      link: '/ata-das-sessoes'
    },
    {
      name: 'atos admissionais',
      link: '/atos-admissionais'
    },
    {
      name: 'audiência pública',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'balancete',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Balanço Anual',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'boletim de votação',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'contas anuais',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'contratação direta',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'contratos',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'convênios',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'dadods da frota',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'decretos e leis',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'diária',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'editais',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'folha de pagamento',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e requerimento',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e deliberação',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'instrumento de planejamento',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Licitações',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Lista de presença',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Moções',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Ofício',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'patrimônios públicos',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'pedidos de providência',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'receitas e despesas',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'RREO E RGF',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'SIST. DE Registro de preço',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'transferência de recursos',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'visão geral',
      link: 'https://www.google.com.br/'
    }
     
  ]
}
