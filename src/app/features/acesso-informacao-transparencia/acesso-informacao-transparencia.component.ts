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
    { name: 'Agenda do Presidente', externo: '', link: '/agenda-presidente' },
    { name: 'Balanço geral', externo: '', link: '/balanco-geral' },
    {
      name: 'Balancete Financeiro',
      externo: '',
      link: '/balancete-financeiro',
    },
    {
      name: 'Carta de Serviço ao usuário',
      externo: '',
      link: '/carta-servico-usuario',
    },
    { name: 'Comissões', externo: '', link: '/comissoes' },
    { name: 'Convênios', externo: '', link: '/convenios' },
    {
      name: 'Cotas para exercício de atividade parlamentar',
      externo:
        'https://www.saomigueldoguama.pa.leg.br/portal-da-transparencia/cotas-para-exercicio-da-atividade-parlamentar-verba-indenizatoria/',
      link: '',
    },
    { name: 'Dados Abertos', externo: '', link: '/dados-abertos' },
    { name: 'despesas', externo: '', link: '/despesas' },
    {
      name: 'documentos administrativos',
      externo: '',
      link: '/documentos-administrativos',
    },
    {
      name: 'Documentos e informações sigilosas',
      externo: '',
      link: '/documentos-informacoes-sigilosas',
    },
    {
      name: 'estrutura organizacional',
      externo: '',
      link: '/estrutura-organizacional',
    },
    { name: 'fale conosco', externo: '', link: '/fale-conosco' },
    { name: 'fiscal de contrato', externo: '', link: '/fiscal-contrato' },
    {
      name: 'julgamento das contas da prefeitura municipal',
      externo: '',
      link: '/julgamento-contas-prefeitura',
    },
    { name: 'LGPD', externo: '', link: '/lgpd' },
    { name: 'Lei de diretrizes orçamentárias', externo: '', link: '/LDO' },
    { name: 'LEI ORÇAMENTÁRIA ANUAL', externo: '', link: '/LOA' },
    {
      name: 'Lei orgânica municipal',
      externo: '',
      link: '/lei-organica-municipal',
    },
    {
      name: 'legislação de pessoal do municipio',
      externo: '',
      link: '/legislacao-pessoal-municipio',
    },
    {
      name: 'Licitações / Contratos',
      externo: '',
      link: '/licitacoes-contratos',
    },
    {
      name: 'Lista de Preposições e presença',
      externo: '',
      link: '/lista-preposicoes-presenca',
    },
    { name: 'Mapa do site', externo: '', link: '/mapa-site' },
    {
      name: 'Matérias legislativas',
      externo: '',
      link: '/materias-legislativas',
    },
    { name: 'normas jurídicas', externo: '', link: 'normas-juridicas' },
    {
      name: 'ordem cronológica dos pagamentos',
      externo: '',
      link: '/ordem-cronologica-pagamentos',
    },
    { name: 'ouvidoria', externo: '', link: '/ouvidoria' },
    { name: 'perguntas frequentes', externo: '', link: '/faq' },
    {
      name: 'pesquisa de satisfação dos serviços',
      externo: '',
      link: '/pesquisa-satisfacao-servicos',
    },
    { name: 'plano estratégico', externo: '', link: '/plano-estrategico' },
    { name: 'plano plurianual', externo: '', link: '/ppa' },
    { name: 'programa e ações', externo: '', link: '/programa-acoes' },
    {
      name: 'parecer prévio de julgamento de contas',
      externo: '',
      link: '/parecer-previo-julgamento-contas',
    },
    {
      name: 'Projetos e execuções de obras públicas',
      externo: '',
      link: '/projetos-execucoes-obras-publicas',
    },
    {
      name: 'plano de contratações anual',
      externo: '',
      link: '/plano-contratacoes-anual',
    },
    {
      name: 'relação dos licitantes contratados sancionados',
      externo: '',
      link: '/relacao-licitantes-contratados-sancionados',
    },
    {
      name: 'radar nacional de transparência pública',
      externo: '',
      link: '/radar-nacional-transparencia-publica',
    },
    {
      name: 'regulamentação da concessão de diárias',
      externo: '',
      link: '/regulamentacao-concessao-diarias',
    },
    {
      name: 'regulamentação da ouvidoria',
      externo: '',
      link: '/regulamentacao-ouvidoria',
    },
    { name: 'regulamentação da lai', externo: '', link: '/regulamentacao-lai' },
    {
      name: 'Relação do patrimônio público (imóveis)',
      externo: '',
      link: '/relacao-patrimonio-publico-imoveis',
    },
    {
      name: 'relação do patrimônio público móveis',
      externo: '',
      link: '/relacao-patrimonio-publico-moveis',
    },
    {
      name: 'relatório de gestão e atividades',
      externo: '',
      link: '/relatorio-gestao-atividades',
    },
    {
      name: 'relatório do controle interno',
      externo: '',
      link: '/relatorio-controle-interno',
    },
    { name: 'relatório do e-sic', externo: '', link: '/relatorio-esic' },
    {
      name: 'relatório de gestão fiscal',
      externo: '',
      link: '/relatorio-gestao-fiscal',
    },
    {
      name: 'relatórios de atividades dos parlamentares',
      externo: '',
      link: '/relatorio-atividades-parlamentares',
    },
    { name: 'repasses', externo: '', link: '/repasses' },
    {
      name: 'serviço de informação ao cidadão',
      externo: '',
      link: '/servico-informacao-cidadao',
    },
    { name: 'serviço online', externo: '', link: '/servico-online' },
    { name: 'sessões', externo: '', link: '/sessoes' },
    { name: 'Ata das sessões', externo: '', link: '/ata-das-sessoes' },
    { name: 'atos admissionais', externo: '', link: '/atos-admissionais' },
    { name: 'audiência pública', externo: '', link: '/audiencias-publicas' },
    { name: 'balancete', externo: '', link: '/balancete-financeiro' },
    { name: 'Balanço Anual', externo: 'https://www.google.com.br/', link: '' },
    { name: 'boletim de votação', externo: '', link: '/boletim-votacao' },
    { name: 'contas anuais', externo: 'https://www.google.com.br/', link: '' },
    { name: 'contratação direta', externo: '', link: '/contratacao-direta' },
    { name: 'contratos', externo: '', link: '/contratos' },
    { name: 'dados da frota', externo: 'https://www.google.com.br/', link: '' },
    { name: 'decretos e leis', externo: '', link: '/legislacao-municipal' },
    { name: 'diária', externo: '', link: '/diaria' },
    { name: 'editais', externo: '', link: '/editais' },
    {
      name: 'folha de pagamento',
      externo: 'https://www.google.com.br/',
      link: '',
    },
    {
      name: 'indicação e requerimento',
      externo: '',
      link: '/indicacoes-requerimentos',
    },
    {
      name: 'indicação e deliberação',
      externo: '',
      link: '/indicacao-deliberacao',
    },
    {
      name: 'instrumento de planejamento',
      externo: 'https://www.google.com.br/',
      link: '',
    },
    { name: 'Licitações', externo: '', link: '/licitacoes' },
    { name: 'Lista de presença', externo: '', link: '/lista-presenca' },
    { name: 'Moções', externo: '', link: '/mocoes' },
    { name: 'Ofício', externo: '', link: '/oficio' },
    {
      name: 'patrimônios públicos',
      externo: '',
      link: '/patrimonios-publicos',
    },
    {
      name: 'pedidos de providência',
      externo: '',
      link: '/pedidos-providencia',
    },
    {
      name: 'receitas e despesas',
      externo: 'https://www.google.com.br/',
      link: '',
    },
    { name: 'RREO E RGF', externo: '', link: '/rreo-rgf' },
    {
      name: 'SIST. DE Registro de preço',
      externo: '',
      link: '/registro-preco',
    },
    {
      name: 'transferência de recursos',
      externo: '',
      link: '/transferencia-recursos',
    },
    { name: 'visão geral', externo: 'https://www.google.com.br/', link: '' },
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
