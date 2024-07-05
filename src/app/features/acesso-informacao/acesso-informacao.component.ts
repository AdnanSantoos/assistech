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
      link: '/audiencias-publicas'
    },
    {
      name: 'balancete',
      link: '/balancete-financeiro'
    },
    {
      name: 'Balanço Anual',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'boletim de votação',
      link: '/boletim-votacao'
    },
    {
      name: 'contas anuais',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'contratação direta',
      link: '/contratacao-direta'
    },
    {
      name: 'contratos',
      link: '/contratos'
    },
    {
      name: 'convênios',
      link: '/convenios'
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
      link: '/diaria'
    },
    {
      name: 'editais',
      link: '/editais'
    },
    {
      name: 'folha de pagamento',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e requerimento',
      link: '/indicacoes-requerimentos'
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
