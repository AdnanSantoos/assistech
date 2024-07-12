import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acesso-informacao-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './acesso-informacao-administrativo.component.html',
  styleUrl: './acesso-informacao-administrativo.component.scss'
})
export class AcessoInformacaoAdministrativoComponent {
  button = [
    {
      name: 'Ata das sessões',
      externo:'',
      link: '/ata-das-sessoes'
    },
    {
      name: 'atos admissionais',
      externo:'',
      link: '/atos-admissionais'
    },
    {
      name: 'audiência pública',
      externo:'',
      link: '/audiencias-publicas'
    },
    {
      name: 'balancete',
      externo:'',
      link: '/balancete-financeiro'
    },
    {
      name: 'Balanço Anual',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'boletim de votação',
      externo:'',
      link: '/boletim-votacao'
    },
    {
      name: 'decretos e leis',
      externo:'',
      link: '/legislacao-municipal'
    },
    {
      name: 'contratação direta',
      externo:'',
      link: '/contratacao-direta'
    },
    {
      name: 'contratos',
      externo:'',
      link: '/contratos'
    },
    {
      name: 'convênios',
      externo:'',
      link: '/convenios'
    },
    {
      name: 'dados da frota',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'editais',
      externo:'',
      link: '/editais'
    },
    {
      name: 'folha de pagamento',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e requerimento',
      externo:'',
      link: '/indicacoes-requerimentos'
    },
    {
      name: 'indicação e deliberação',
      externo:'',
      link: '/indicacao-deliberacao'
    },
    {
      name: 'instrumento de planejamento',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Licitações',
      externo:'',
      link: '/licitacoes'
    },
    {
      name: 'Lista de presença',
      externo:'',
      link: '/lista-presenca'
    },
    {
      name: 'Moções',
      externo:'',
      link: '/mocoes'
    },
    {
      name: 'Ofício',
      externo:'',
      link: '/oficio'
    },
    {
      name: 'patrimônios públicos',
      externo:'',
      link: '/patrimonios-publicos'
    },
    {
      name: 'pedidos de providência',
      externo:'',
      link: '/pedidos-providencia'
    },
    {
      name: 'PPA, LOA E LDO',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'RREO E RGF',
      externo:'',
      link: '/rreo-rgf'
    },
    {
      name: 'SIST. DE Registro de preço',
      externo:'',
      link: '/registro-preco'
    },
    {
      name: 'transferência de recursos',
      externo:'',
      link: '/transferencia-recursos'
    },
    {
      name: 'Notícias',
      externo:'',
      link: 'https://www.google.com.br/'
    }
     
  ]
}
