import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acesso-informacao-transparencia',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './acesso-informacao-transparencia.component.html',
  styleUrl: './acesso-informacao-transparencia.component.scss',
})
export class AcessoInformacaoTransparenciaComponent implements OnInit {
  button = [
    {
      name: 'Agenda do Presidente',
      externo: '',
      icon: '/app/assets/novos-icones/agenda-presidente.svg',
      link: '/trn/agenda-presidente',
    },
    {
      name: 'Balanço geral',
      externo: '',
      icon: '/app/assets/novos-icones/balanco-anual.svg',
      link: '/balanco-geral',
    },
    // {
    //   name: 'Balancete Financeiro',
    //   externo: '',
    //   icon: '/app/assets/novos-icones/balancete.svg',
    //   link: '/balancete-financeiro',
    // },
    {
      name: 'Carta de Serviço ao usuário',
      externo: '',
      icon: '/app/assets/novos-icones/carta-servico-usuario.svg',
      link: '/carta-servico-usuario',
    },
    {
      name: 'Comissões',
      externo: '',
      icon: '/app/assets/novos-icones/comissoes.svg',
      link: '/trn/comissoes',
    },
    {
      name: 'Convênios',
      externo: '',
      icon: '/app/assets/novos-icones/convenios.svg',
      link: '/convenios',
    },
    {
      name: 'Cotas para exercício de atividade parlamentar',
      externo:
        'https://www.saomigueldoguama.pa.leg.br/portal-da-transparencia/cotas-para-exercicio-da-atividade-parlamentar-verba-indenizatoria/',
      icon: '/app/assets/novos-icones/cotas-para-exercicio-atividade-parlamentar.svg',
      link: '',
    },
    {
      name: 'Dados Abertos',
      externo: '',
      icon: '/app/assets/novos-icones/dados-abertos.svg',
      link: '/dados-abertos',
    },
    {
      name: 'despesas',
      externo: '',
      icon: '/app/assets/novos-icones/despesas.svg',
      link: '/despesas',
    },
    {
      name: 'documentos administrativos',
      externo: '',
      icon: '/app/assets/novos-icones/documentos-administrativos.svg',
      link: '/documentos-administrativos',
    },
    {
      name: 'Documentos e informações sigilosas',
      externo: '',
      icon: '/app/assets/novos-icones/documentos-informacoes-sigilosas.svg',
      link: '/documentos-informacoes-sigilosas',
    },
    {
      name: 'estrutura organizacional',
      externo: '',
      icon: '/app/assets/novos-icones/estrutura-organizacional.svg',
      link: '/trn/estrutura-organizacional',
    },
    {
      name: 'fale conosco',
      externo: '',
      icon: '/app/assets/novos-icones/fale-conosco.svg',
      link: '/fale-conosco',
    },
    {
      name: 'fiscal de contrato',
      externo: '',
      icon: '/app/assets/novos-icones/fiscal-contrato.svg',
      link: '/fiscal-contrato',
    },
    {
      name: 'julgamento das contas da prefeitura municipal',
      externo: '',
      icon: '/app/assets/novos-icones/julgamento-contas-prefeitura.svg',
      link: '/julgamento-contas-prefeitura',
    },
    {
      name: 'LGPD',
      externo: '',
      icon: '/app/assets/novos-icones/lgpd.svg',
      link: '/lgpd',
    },
    {
      name: 'Lei de diretrizes orçamentárias',
      externo: '',
      icon: '/app/assets/novos-icones/lei-diretrizes-orcamentaria.svg',
      link: '/LDO',
    },
    {
      name: 'LEI ORÇAMENTÁRIA ANUAL',
      externo: '',
      icon: '/app/assets/novos-icones/lei-orcamentaria-anual.svg',
      link: '/LOA',
    },
    {
      name: 'Lei orgânica municipal',
      externo: '',
      icon: '/app/assets/novos-icones/lei-organica-municipal.svg',
      link: '/lei-organica-municipal',
    },
    {
      name: 'legislação de pessoal do municipio',
      externo: '',
      icon: '/app/assets/novos-icones/legislacao-pessoal-municipio.svg',
      link: '/legislacao-pessoal-municipio',
    },
    {
      name: 'Licitações / Contratos',
      externo: '',
      icon: '/app/assets/novos-icones/licitacoes-contratos.svg',
      link: '/licitacoes-contratos',
    },
    {
      name: 'Lista de Preposições e presença',
      externo: '',
      icon: '/app/assets/novos-icones/lista-preposicoes-presenca.svg',
      link: '/lista-preposicoes-presenca',
    },
    {
      name: 'Mapa do site',
      externo: '',
      icon: '/app/assets/novos-icones/mapa-site.svg',
      link: '/mapa-site',
    },
    {
      name: 'Matérias legislativas',
      externo: '',
      icon: '/app/assets/novos-icones/materias-legislativas.svg',
      link: '/materias-legislativas',
    },
    {
      name: 'normas jurídicas',
      externo: '',
      icon: '/app/assets/novos-icones/normas-juridicas.svg',
      link: 'normas-juridicas',
    },
    {
      name: 'ordem cronológica dos pagamentos',
      externo: '',
      icon: '/app/assets/novos-icones/ordem-cronologica-pagamentos.svg',
      link: '/ordem-cronologica-pagamentos',
    },
    {
      name: 'ouvidoria',
      externo: '',
      icon: '/app/assets/novos-icones/ouvidoria.svg',
      link: '/ouvidoria',
    },
    {
      name: 'perguntas frequentes',
      externo: '',
      icon: '/app/assets/novos-icones/perguntas-frequentes.svg',
      link: '/faq',
    },
    {
      name: 'pesquisa de satisfação dos serviços',
      externo: '',
      icon: '/app/assets/novos-icones/pesquisa-satisfacao-servicos.svg',
      link: '/pesquisa-satisfacao-servicos',
    },
    {
      name: 'plano estratégico',
      externo: '',
      icon: '/app/assets/novos-icones/plano-estrategico.svg',
      link: '/plano-estrategico',
    },
    {
      name: 'plano plurianual',
      externo: '',
      icon: '/app/assets/novos-icones/plano-plurianual.svg',
      link: '/ppa',
    },
    {
      name: 'programa e ações',
      externo: '',
      icon: '/app/assets/novos-icones/programas-acoes.svg',
      link: '/programa-acoes',
    },
    {
      name: 'parecer prévio de julgamento de contas',
      externo: '',
      icon: '/app/assets/novos-icones/parecer-previo-julgamento-contas.svg',
      link: '/parecer-previo-julgamento-contas',
    },
    {
      name: 'Projetos e execuções de obras públicas',
      externo: '',
      icon: '/app/assets/novos-icones/projeto-execucao-obras-publiacs.svg',
      link: '/projetos-execucoes-obras-publicas',
    },
    {
      name: 'plano de contratações anual',
      externo: '',
      icon: '/app/assets/novos-icones/plano-contratacao-anual.svg',
      link: '/plano-contratacoes-anual',
    },
    {
      name: 'relação dos licitantes contratados sancionados',
      externo: '',
      icon: '/app/assets/novos-icones/relacao-licitantes-contratados-sancionados.svg',
      link: '/relacao-licitantes-contratados-sancionados',
    },
    {
      name: 'radar nacional de transparência pública',
      externo: '',
      icon: '/app/assets/novos-icones/radar-nacional-transparencia-publica.svg',
      link: '/radar-nacional-transparencia-publica',
    },
    {
      name: 'regulamentação da concessão de diárias',
      externo: '',
      icon: '/app/assets/novos-icones/regulamentacao-da-concessao-diarias.svg',
      link: '/regulamentacao-concessao-diarias',
    },
    {
      name: 'regulamentação da ouvidoria',
      externo: '',
      icon: '/app/assets/novos-icones/regulamentacao-ouvidoria.svg',
      link: '/regulamentacao-ouvidoria',
    },
    {
      name: 'regulamentação da lei',
      externo: '',
      icon: '/app/assets/novos-icones/regulamentacao-lei.svg',
      link: '/regulamentacao-lei',
    },
    {
      name: 'Relação do patrimônio público (imóveis)',
      externo: '',
      icon: '/app/assets/novos-icones/relacao-patrimonio-publico-imoveis.svg',
      link: '/relacao-patrimonio-publico-imoveis',
    },
    {
      name: 'relação do patrimônio público móveis',
      externo: '',
      icon: '/app/assets/novos-icones/relacao-patrimonio-publico-moveis.svg',
      link: '/relacao-patrimonio-publico-moveis',
    },
    {
      name: 'relatório de gestão e atividades',
      externo: '',
      icon: '/app/assets/novos-icones/relatorio-gestao-atividades.svg',
      link: '/relatorio-gestao-atividades',
    },
    {
      name: 'relatório do controle interno',
      externo: '',
      icon: '/app/assets/novos-icones/relatorio-control-interno.svg',
      link: '/relatorio-controle-interno',
    },
    {
      name: 'relatório do e-sic',
      externo: '',
      icon: '/app/assets/novos-icones/relatorio-esic.svg',
      link: '/relatorio-esic',
    },
    {
      name: 'relatório de gestão fiscal',
      externo: '',
      icon: '/app/assets/novos-icones/relatorio-gestao-fiscal.svg',
      link: '/relatorio-gestao-fiscal',
    },
    {
      name: 'relatórios de atividades dos parlamentares',
      externo: '',
      icon: '/app/assets/novos-icones/relatorio-atividades-parlamentares.svg',
      link: '/relatorio-atividades-parlamentares',
    },
    {
      name: 'repasses',
      externo: '',
      icon: '/app/assets/novos-icones/repasses.svg',
      link: '/repasses',
    },
    {
      name: 'serviço de informação ao cidadão',
      externo: '',
      icon: '/app/assets/novos-icones/servico-informacao-cidadao.svg',
      link: '/servico-informacao-cidadao',
    },
    {
      name: 'serviço online',
      externo: '',
      icon: '/app/assets/novos-icones/servico-online.svg',
      link: '/servico-online',
    },
    {
      name: 'sessões',
      externo: '',
      icon: '/app/assets/novos-icones/sessoes.svg',
      link: '/sessoes',
    },
    {
      name: 'Ata das sessões',
      externo: '',
      icon: '/app/assets/novos-icones/ata-das-sessoes.svg',
      link: '/ata-das-sessoes',
    },
    {
      name: 'atos admissionais',
      externo: '',
      icon: '/app/assets/novos-icones/atos-admissionais-e-boletim-de-votacao.svg',
      link: '/atos-admissionais',
    },
    {
      name: 'audiência pública',
      externo: '',
      icon: '/app/assets/novos-icones/audiencia-publica.svg',
      link: '/audiencias-publicas',
    },
    {
      name: 'balancete',
      externo: '',
      icon: '/app/assets/novos-icones/balancete.svg',
      link: '/balancete-financeiro',
    },
    {
      name: 'Balanço Anual',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/balanco-anual.svg',
      link: '',
    },
    {
      name: 'boletim de votação',
      externo: '',
      icon: '/app/assets/novos-icones/atos-admissionais-e-boletim-de-votacao.svg',
      link: '/boletim-votacao',
    },
    {
      name: 'contas anuais',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/contas-anuais.svg',
      link: '',
    },
    {
      name: 'contratação direta',
      externo: '',
      icon: '/app/assets/novos-icones/contratacao-direta.svg',
      link: '/contratacao-direta',
    },
    {
      name: 'contratos',
      externo: '',
      icon: '/app/assets/novos-icones/contratos.svg',
      link: '/contratos',
    },
    {
      name: 'dados da frota',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/dados-da-frota.svg',
      link: '',
    },
    {
      name: 'decretos e leis',
      externo: '',
      icon: '/app/assets/novos-icones/decreto-e-leis.svg',
      link: '/legislacao-municipal',
    },
    {
      name: 'diária',
      externo: '',
      icon: '/app/assets/novos-icones/diaria.svg',
      link: '/diaria',
    },
    {
      name: 'editais',
      externo: '',
      icon: '/app/assets/novos-icones/editais.svg',
      link: '/editais',
    },
    {
      name: 'folha de pagamento',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/folha-de-pagamento.svg',
      link: '',
    },
    {
      name: 'indicação e requerimento',
      externo: '',
      icon: '/app/assets/novos-icones/indicacao-e-requerimento.svg',
      link: '/indicacoes-requerimentos',
    },
    {
      name: 'indicação e deliberação',
      externo: '',
      icon: '/app/assets/novos-icones/indicacao-deliberacao.svg',
      link: '/indicacao-deliberacao',
    },
    {
      name: 'instrumento de planejamento',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/instrumento-de-planejamento.svg',
      link: '',
    },
    {
      name: 'Licitações',
      externo: '',
      icon: '/app/assets/novos-icones/licitacoes.svg',
      link: '/licitacoes',
    },
    {
      name: 'Lista de presença',
      externo: '',
      icon: '/app/assets/novos-icones/lista-de-presenca.svg',
      link: '/lista-presenca',
    },
    {
      name: 'Moções',
      externo: '',
      icon: '/app/assets/novos-icones/mocoes.svg',
      link: '/mocoes',
    },
    {
      name: 'Ofício',
      externo: '',
      icon: '/app/assets/novos-icones/oficio.svg',
      link: '/oficio',
    },
    {
      name: 'patrimônios públicos',
      externo: '',
      icon: '/app/assets/novos-icones/patrimonios-publico.svg',
      link: '/patrimonios-publicos',
    },
    {
      name: 'pedidos de providência',
      externo: '',
      icon: '/app/assets/novos-icones/pedidos-de-providencia.svg',
      link: '/pedidos-providencia',
    },
    {
      name: 'receitas e despesas',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/receita-despesas.svg',
      link: '',
    },
    {
      name: 'RREO E RGF',
      externo: '',
      icon: '/app/assets/novos-icones/rreo-rgf.svg',
      link: '/rreo-rgf',
    },
    // {
    //   name: 'SIST. DE Registro de preço',
    //   externo: '',
    //   icon: '/app/assets/novos-icones/.svg',
    //   link: '/registro-preco',
    // },
    {
      name: 'transferência de recursos',
      externo: '',
      icon: '/app/assets/novos-icones/transferencia-recursos.svg',
      link: '/transferencia-recursos',
    },
    {
      name: 'visão geral',
      externo: 'https://www.google.com.br/',
      icon: '/app/assets/novos-icones/visao-geral.svg',
      link: '',
    },
  ];
  // Função para remover duplicatas e ordenar
  removeDuplicatesAndSort(buttonList: any[]) {
    const uniqueButtons = buttonList.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.name.toLowerCase() === item.name.toLowerCase())
    );

    uniqueButtons.sort((a, b) => a.name.localeCompare(b.name));
    return uniqueButtons;
  }

  ngOnInit() {
    this.button = this.removeDuplicatesAndSort(this.button);
  }
}
