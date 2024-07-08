import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acesso-informacao-transparencia',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './acesso-informacao-transparencia.component.html',
  styleUrl: './acesso-informacao-transparencia.component.scss'
})
export class AcessoInformacaoTransparenciaComponent {
  button = [
    {
      name: 'Agenda do Presidente',
      link: '/agenda-presidente'
    },
    {
      name: 'Balanço geral',
      link: '/balanco-geral'
    },
    {
      name: 'Balancete Fiananceiro',
      link: '/balancete-financeiro'
    },
    {
      name: 'Carta de Serviço ao usuário',
      link: '/carta-servico-usuario'
    },
    {
      name: 'Comissões',
      link: '/comissoes'
    },
    {
      name: 'Convênios',
      link: '/convenios'
    },
    {
      name: 'Cotas para exercício de atividade parlamentar',
      link: '/cotas-exercicio-atividade-parlamentar'
    },
    {
      name: 'Dados Abertos',
      link: '/dados-abertos'
    },
    {
      name: 'despesas',
      link: '/despesas'
    },
    {
      name: 'documentos administrativos',
      link: '/documentos-administrativos'
    },
    {
      name: 'Documentos e informações sigilosas',
      link: '/documentos-informacoes-sigilosas'
    },
    {
      name: 'estrutura organizacional',
      link: '/estrutura-organizacional'
    },
    {
      name: 'fale conosco',
      link: '/fale-conosco'
    },
    {
      name: 'fiscal de contrato',
      link: '/fiscal-contrato'
    },
    {
      name: 'julgamento das contas da prefeitura municipal',
      link: '/julgamento-contas-prefeitura'
    },
    {
      name: 'LGPD',
      link: '/lgpd'
    },
    {
      name: 'Lei de diretrizes orçamentárias',
      link: '/LDO'
    },
    {
      name: 'LEI ORÇAMENTÁRIA ANUAL',
      link: '/LOA'
    },
    {
      name: 'Lei orgânica municipal',
      link: '/lei-organica-municipal'
    },
    {
      name: 'legislação de pessoal do municipio',
      link: '/legislacao-pessoal-municipio'
    },
    {
      name: 'Licitações / Contratos',
      link: '/licitacoes-contratos'
    },
    {
      name: 'Lista de Preposições e presença',
      link: '/lista-preposicoes-presenca'
    },
    {
      name: 'Mapa do site',
      link: '/mapa-site'
    },
    {
      name: 'Matérias legislativas',
      link: '/materias-legislativas'
    },
    {
      name: 'normas jurídicas',
      link: 'normas-juridicas'
    },
    {
      name: 'ordem cronológica dos pagamentos',
      link: '/ordem-cronologica-pagamentos'
    },
    {
      name: 'ouvidoria',
      link: '/ouvidoria'
    },
    {
      name: 'perguntas frequentes',
      link: '/faq'
    },
    {
      name: 'pesquisa de satisfação dos serviços',
      link: '/pesquisa-satisfacao-servicos'
    },
    {
      name: 'plano estratégico',
      link: '/plano-estrategico'
    },
    {
      name: 'plano plurianual',
      link: '/ppa'
    },
    {
      name: 'programa e ações',
      link: '/programa-acoes'
    },
    {
      name: 'parecer prévio de julgamento de contas',
      link: '/parecer-previo-julgamento-contas'
    },
    {
      name: 'Projetos e execuções de obras públicas',
      link: '/projetos-execucoes-obras-publicas'
    },
    {
      name: 'plano de contratações anual',
      link: '/plano-contratacoes-anual'
    },
     {
      name: 'relação dos licitantes contratados sancionados',
      link: '/relacao-licitantes-contratados-sancionados'
    },
    {
      name: 'radar nacional de transparência pública',
      link: '/radar-nacional-transparencia-publica'
    },
    {
      name: 'regulamentação da concessão de diárias',
      link: '/regulamentacao-concessao-diarias'
    },
    {
      name: 'regulamentação da ouvidoria',
      link: '/regulamentacao-ouvidoria'
    },
    {
      name: 'regulamentação da lai',
      link: '/regulamentacao-lai'
    },
    {
      name: 'Relação do patrimônio público (imóveis)',
      link: '/relacao-patrimonio-publico-imoveis'
    },
    {
      name: 'relação do patrimônio público móveis',
      link: '/relacao-patrimonio-publico-moveis'
    },
    {
      name: 'relatório de gestão e atividades',
      link: '/relatorio-gestao-atividades'
    },
    {
      name: 'relatório do controle interno',
      link: '/relatorio-controle-interno'
    },
    {
      name: 'relatório do e-sic',
      link: '/relatorio-esic'
    },
    {
      name: 'relatório de gestão fiscal',
      link: '/relatorio-gestao-fiscal'
    },
    {
      name: 'relatórios de atividades dos parlamentares',
      link: '/relatorio-atividades-parlamentares'
    },
    {
      name: 'repasses',
      link: '/repasses'
    },
    {
      name: 'serviço de informação ao cidadão',
      link: '/servico-informacao-cidadao'
    },
    {
      name: 'serviço online',
      link: '/servico-online'
    },
    {
      name: 'sessões',
      link: '/sessoes'
    }
    

  ]
}
