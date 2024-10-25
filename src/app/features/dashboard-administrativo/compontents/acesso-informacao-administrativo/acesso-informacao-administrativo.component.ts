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
      link: '/adm/portal-de-transparencia-administrativo/ata-das-sessoes',
      icon: '../../../../../assets/novos-icones/ata-das-sessoes.svg'
    },
    {
      name: 'atos admissionais',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/atos-admissionais',
      icon: '../../../../../assets/novos-icones/atos-admissionais-e-boletim-de-votacao.svg'
    },
    {
      name: 'agenda do presidente',
      externo: '',
      link: '/adm/pncp-administrativo/adicionar-agenda-do-presidente',
      icon: '../../../../../assets/novos-icones/agenda-presidente.svg'
    },
    {
      name: 'carta de serviços',
      externo: '',
      link: '/adm/pncp-administrativo/adicionar-carta-servicos',
      icon: '../../../../../assets/novos-icones/carta-servico-usuario.svg'
    },
    {
      name: 'comissões',
      externo: '',
      link: '/adm/pncp-administrativo/adicionar-comissoes',
      icon: '../../../../../assets/novos-icones/comissoes.svg'
    },
    {
      name: 'cotas para serviço parlamentar',
      externo: '',
      link: '/adm/pncp-administrativo/adicionar-cotas-para-servico-parlamentar',
      icon: '../../../../../assets/novos-icones/cotas-para-exercicio-atividade-parlamentar.svg'
    },
    {
      name: 'audiência pública',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/audiencia-publica',
      icon: '../../../../../assets/novos-icones/audiencia-publica.svg'
    },
    {
      name: 'balancete',
      externo: '',
      link: '/adm/portal-de-transparencia-administrativo/balancete',
      icon: '../../../../../assets/novos-icones/balancete.svg'
    },
    {
      name: 'Balanço Anual',
      externo: '',
      link: '/adm/balanco-anual-administrativo',
      icon: '../../../../../assets/novos-icones/balanco-anual.svg'
    },
    {
      name: 'boletim de votação',
      externo: '',
      link: '/adm/boletim-votacao-administrativo',
      icon: '../../../../../assets/novos-icones/atos-admissionais-e-boletim-de-votacao.svg'
    },
    {
      name: 'decretos e leis',
      externo: '',
      link: '/adm/legislacao-municipal-administrativo',
      icon: '../../../../../assets/novos-icones/decreto-e-leis.svg'
    },
    {
      name: 'contratação direta',
      externo: '',
      link: '/adm/contratacao-direta-administrativo',
      icon: '../../../../../assets/novos-icones/contratacao-direta.svg'
    },
    {
      name: 'contratos',
      externo: '',
      link: '/adm/contratos-administrativo',
      icon: '../../../../../assets/novos-icones/contratos.svg'
    },
    {
      name: 'convênios',
      externo: '',
      link: '/adm/convenios-administrativo',
      icon: '../../../../../assets/novos-icones/convenios.svg'
    },
    {
      name: 'dados da frota',
      externo: '',
      link: '/adm/dados-da-frota-administrativo',
      icon: '../../../../../assets/novos-icones/dados-da-frota.svg'
    },
    {
      name: 'editais',
      externo: '',
      link: '/adm/editais-licitacoes-administrativo',
      icon: '../../../../../assets/novos-icones/editais.svg'
    },
    {
      name: 'folha de pagamento',
      externo: '',
      link: 'https://www.google.com.br/',
      icon: '../../../../../assets/novos-icones/folha-de-pagamento.svg'
    },
    {
      name: 'indicação e requerimento',
      externo: '',
      link: '/adm/indicacoes-requerimento-administrativo',
      icon: '../../../../../assets/novos-icones/indicacao-e-requerimento.svg'
    },
    {
      name: 'indicação e deliberação',
      externo: '',
      link: '/adm/indicacoes-deliberacoes-administrativo',
      icon: '../../../../../assets/novos-icones/indicacao-deliberacao.svg'
    },
    {
      name: 'instrumento de planejamento',
      externo: '',
      link: 'https://www.google.com.br/',
      icon: '../../../../../assets/novos-icones/instrumento-de-planejamento.svg'
    },
    {
      name: 'Licitações',
      externo: '',
      link: '/adm/pncp-administrativo/licitacoes',
      icon: '../../../../../assets/novos-icones/licitacoes.svg'
    },
    {
      name: 'Lista de presença',
      externo: '',
      link: '/adm/lista-presenca-administrativo',
      icon: '../../../../../assets/novos-icones/lista-de-presenca.svg'
    },
    {
      name: 'Moções',
      externo: '',
      link: '/adm/mocoes-administrativo',
      icon: '../../../../../assets/novos-icones/mocoes.svg'
    },
    {
      name: 'Ofício',
      externo: '',
      link: '/adm/oficio-administrativo',
      icon: '../../../../../assets/novos-icones/oficio.svg'
    },
    {
      name: 'patrimônios públicos',
      externo: '',
      link: '/adm/patrimonios-publicos-administrativo',
      icon: '../../../../../assets/novos-icones/patrimonios-publico.svg'
    },
    {
      name: 'pedidos de providência',
      externo: '',
      link: '/adm/pedidos-providencia-administrativo',
      icon: '../../../../../assets/novos-icones/pedidos-de-providencia.svg'
    },
    {
      name: 'PPA, LOA E LDO',
      externo: '',
      link: '/adm/dashboard-administrativo/ppa-loa-ldo',
      icon: '../../../../../assets/novos-icones/ppa-loa-ldo.svg'
    },
    {
      name: 'RREO E RGF',
      externo: '',
      link: '/adm/rreo-rgf-administrativo',
      icon: '../../../../../assets/novos-icones/rreo-rgf.svg'
    },
    {
      name: 'SIST. DE Registro de preço',
      externo: '',
      link: '/adm/registro-preco-administrativo',
      icon: '../../../../../assets/novos-icones/registro-preco.svg'
    },
    {
      name: 'transferência de recursos',
      externo: '',
      link: '/adm/transferencia-recursos-administrativo',
      icon: '../../../../../assets/novos-icones/transferencia-recursos.svg'
    },
    {
      name: 'Notícias',
      externo: '',
      link: '/adm/noticias-administrativo',
      icon: '../../../../../assets/novos-icones/noticias.svg'
    }
  ];

  button2 = [
    {
      name: 'Portal de Transparência',
      externo: '',
      link: '/adm/acesso-informacao-administrativo',
      icon: '../../../../../assets/novos-icones/portal-transparencia.svg'
    },
    {
      name: 'pncp',
      externo: '',
      link: '/adm/pncp-administrativo',
      icon: '../../../../../assets/novos-icones/pncp.svg'
    },
    {
      name: 'Diário Oficial',
      externo: '',
      link: '/adm/diario-oficial-administrativo',
      icon: '../../../../../assets/novos-icones/diario-oficial.svg'
    }
  ];
}
