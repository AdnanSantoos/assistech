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
      link: '/atas-sessao-administrativo'
    },
    {
      name: 'atos admissionais',
      externo:'',
      link: '/atos-admissionais-administrativo'
    },
    {
      name: 'audiência pública',
      externo:'',
      link: '/audiencia-publica-administrativo'
    },
    {
      name: 'balancete',
      externo:'',
      link: '/balanco-administrativo'
    },
    {
      name: 'Balanço Anual',
      externo:'',
      link: '/balanco-anual-administrativo'
    },
    {
      name: 'boletim de votação',
      externo:'',
      link: '/boletim-votacao-administrativo'
    },
    {
      name: 'decretos e leis',
      externo:'',
      link: '/legislacao-municipal-administrativo'
    },
    {
      name: 'contratação direta',
      externo:'',
      link: '/contratacao-direta-administrativo'
    },
    {
      name: 'contratos',
      externo:'',
      link: '/contratos-administrativo'
    },
    {
      name: 'convênios',
      externo:'',
      link: '/convenios-administrativo'
    },
    {
      name: 'dados da frota',
      externo:'',
      link: '/dados-da-frota-administrativo'
    },
    {
      name: 'editais',
      externo:'',
      link: '/editais-licitacoes-administrativo'
    },
    {
      name: 'folha de pagamento',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e requerimento',
      externo:'',
      link: '/indicacoes-requerimento-administrativo'
    },
    {
      name: 'indicação e deliberação',
      externo:'',
      link: '/indicacoes-deliberacoes-administrativo'
    },
    {
      name: 'instrumento de planejamento',
      externo:'',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Licitações',
      externo:'',
      link: '/licitacoes-administrativo'
    },
    {
      name: 'Lista de presença',
      externo:'',
      link: '/lista-presenca-administrativo'
    },
    {
      name: 'Moções',
      externo:'',
      link: '/mocoes-administrativo'
    },
    {
      name: 'Ofício',
      externo:'',
      link: '/oficio-administrativo'
    },
    {
      name: 'patrimônios públicos',
      externo:'',
      link: '/patrimonios-publicos-administrativo'
    },
    {
      name: 'pedidos de providência',
      externo:'',
      link: '/pedidos-providencia-administrativo'
    },
    {
      name: 'PPA, LOA E LDO',
      externo:'',
      link: '/ppa-loa-ldo-administrativo'
    },
    {
      name: 'RREO E RGF',
      externo:'',
      link: '/rreo-rgf-administrativo'
    },
    {
      name: 'SIST. DE Registro de preço',
      externo:'',
      link: '/registro-preco-administrativo'
    },
    {
      name: 'transferência de recursos',
      externo:'',
      link: '/transferencia-recursos-administrativo'
    },
    {
      name: 'Notícias',
      externo:'',
      link: '/noticias-administrativo'
    }
     
  ]
}
