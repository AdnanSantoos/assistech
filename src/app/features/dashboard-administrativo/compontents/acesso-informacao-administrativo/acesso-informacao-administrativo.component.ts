import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarAdministrativoComponent } from '../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';

@Component({
  selector: 'app-acesso-informacao-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, SidebarAdministrativoComponent],
  templateUrl: './acesso-informacao-administrativo.component.html',
  styleUrl: './acesso-informacao-administrativo.component.scss'
})
export class AcessoInformacaoAdministrativoComponent {
  button = [
    {
      name: 'Ata das sessões',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/ata-das-sessoes'
    },
    {
      name: 'atos admissionais',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/atos-admissionais'
    },
    {
      name: 'audiência pública',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/audiencia-publica'
    },
    {
      name: 'balancete',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/balancete'
    },
    {
      name: 'Balanço Anual',
      externo: '',
      link: '/adm/balanco-anual-administrativo'
    },
    {
      name: 'boletim de votação',
      externo: '',
      link: '/adm/boletim-votacao-administrativo'
    },
    {
      name: 'decretos e leis',
      externo: '',
      link: '/adm/legislacao-municipal-administrativo'
    },
    {
      name: 'contratação direta',
      externo: '',
      link: '/adm/contratacao-direta-administrativo'
    },
    {
      name: 'contratos',
      externo: '',
      link: '/adm/contratos-administrativo'
    },
    {
      name: 'convênios',
      externo: '',
      link: '/adm/convenios-administrativo'
    },
    {
      name: 'dados da frota',
      externo: '',
      link: '/adm/dados-da-frota-administrativo'
    },
    {
      name: 'editais',
      externo: '',
      link: '/adm/editais-licitacoes-administrativo'
    },
    {
      name: 'folha de pagamento',
      externo: '',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'indicação e requerimento',
      externo: '',
      link: '/adm/indicacoes-requerimento-administrativo'
    },
    {
      name: 'indicação e deliberação',
      externo: '',
      link: '/adm/indicacoes-deliberacoes-administrativo'
    },
    {
      name: 'instrumento de planejamento',
      externo: '',
      link: 'https://www.google.com.br/'
    },
    {
      name: 'Licitações',
      externo: '',
      link: '/adm/pncp-administrativo/licitacoes'
    },
    {
      name: 'Lista de presença',
      externo: '',
      link: '/adm/lista-presenca-administrativo'
    },
    {
      name: 'Moções',
      externo: '',
      link: '/adm/mocoes-administrativo'
    },
    {
      name: 'Ofício',
      externo: '',
      link: '/adm/oficio-administrativo'
    },
    {
      name: 'patrimônios públicos',
      externo: '',
      link: '/adm/patrimonios-publicos-administrativo'
    },
    {
      name: 'pedidos de providência',
      externo: '',
      link: '/adm/pedidos-providencia-administrativo'
    },
    {
      name: 'PPA, LOA E LDO',
      externo: '',
      link: '/adm/dashboard-administrativo/ppa-loa-ldo'
    },
    {
      name: 'RREO E RGF',
      externo: '',
      link: '/adm/rreo-rgf-administrativo'
    },
    {
      name: 'SIST. DE Registro de preço',
      externo: '',
      link: '/adm/registro-preco-administrativo'
    },
    {
      name: 'transferência de recursos',
      externo: '',
      link: '/adm/transferencia-recursos-administrativo'
    },
    {
      name: 'Notícias',
      externo: '',
      link: '/adm/noticias-administrativo'
    }

  ]
  button2 = [{
    name: 'Portal de Transparência',
    externo: '',
    link: '/adm/acesso-informacao-administrativo'
  },
  {
    name: 'pncp',
    externo: '',
    link: '/adm/pncp-administrativo'
  },
  {
    name: 'Diário Oficial',
    externo: '',
    link: '/adm/diario-oficial-administrativo'
  },]
}