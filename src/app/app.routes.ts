import { IndicacoesDeliberacoesAdministrativoComponent } from './features/indicacoes-deliberacoes-administrativo/indicacoes-deliberacoes-administrativo.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent)
    },
    {
        path: 'portal-transparencia',
        loadComponent: () => import('./features/home-transparencia/home-transparencia.component').then((c) => c.HomeTransparenciaComponent)
    },
    {
        path: 'acesso-informacao',
        loadComponent: () => import('./features/acesso-informacao/acesso-informacao.component').then((c) => c.AcessoInformacaoComponent)
    },
    {
        path: 'acesso-informacao-administrativo',
        loadComponent: () => import('./features/acesso-informacao-administrativo/acesso-informacao-administrativo.component').then((c) => c.AcessoInformacaoAdministrativoComponent)
    },
    {
        path: 'acesso-informacao-transparencia',
        loadComponent: () => import('./features/acesso-informacao-transparencia/acesso-informacao-transparencia.component').then((c) => c.AcessoInformacaoTransparenciaComponent)
    },
    {
        path: 'agenda-presidente',
        loadComponent: () => import('./features/agenda-presidente/agenda-presidente.component').then((c) => c.AgendaPresidenteComponent)
    },
    {
        path: 'ata-das-sessoes',
        loadComponent: () => import('./features/ata-das-sessoes/ata-das-sessoes.component').then((c) => c.AtaDasSessoesComponent)
    },
    {
        path: 'atas-sessao-administrativo',
        loadComponent: () => import('./features/atas-sessao-administrativo/atas-sessao-administrativo.component').then((c) => c.AtasSessaoAdministrativoComponent)
    },
    {
        path: 'atos-admissionais',
        loadComponent: () => import('./features/atos-admissionais/atos-admissionais.component').then((c) => c.AtosAdmissionaisComponent)
    },
    {
        path: 'atos-admissionais-administrativo',
        loadComponent: () => import('./features/atos-admissionais-administrativo/atos-admissionais-administrativo.component').then((c) => c.AtosAdmissionaisAdministrativoComponent)
    },
    {
        path: 'audiencias-publicas',
        loadComponent: () => import('./features/audiencias-publicas/audiencias-publicas.component').then((c) => c.AudienciasPublicasComponent)
    },
    {
        path: 'audiencia-publica-administrativo',
        loadComponent: () => import('./features/audiencia-publica-administrativo/audiencia-publica-administrativo.component').then((c) => c.AudienciaPublicaAdministrativoComponent)
    },
    {
        path: 'balancete-financeiro',
        loadComponent: () => import('./features/balancete-financeiro/balancete-financeiro.component').then((c) => c.BalanceteFinanceiroComponent)
    },
    {
        path: 'balanco-administrativo',
        loadComponent: () => import('./features/balanco-administrativo/balanco-administrativo.component').then((c) => c.BalancoAdministrativoComponent)
    },
    {
        path: 'balanco-anual-administrativo',
        loadComponent: () => import('./features/balanco-anual-administrativo/balanco-anual-administrativo.component').then((c) => c.BalancoAnualAdministrativoComponent)
    },
    {
        path: 'boletim-votacao',
        loadComponent: () => import('./features/boletim-votacao/boletim-votacao.component').then((c) => c.BoletimVotacaoComponent)
    },
    {
        path: 'boletim-votacao-administrativo',
        loadComponent: () => import('./features/boletim-votacao-administrativo/boletim-votacao-administrativo.component').then((c) => c.BoletimVotacaoAdministrativoComponent)
    },
    {
        path: 'contratacao-direta',
        loadComponent: () => import('./features/contratacao-direta/contratacao-direta.component').then((c) => c.ContratacaoDiretaComponent)
    },
    {
        path: 'contratacao-direta-administrativo',
        loadComponent: () => import('./features/contratacao-direta-administrativo/contratacao-direta-administrativo.component').then((c) => c.ContratacaoDiretaAdministrativoComponent)
    },
    {
        path: 'contratos',
        loadComponent: () => import('./features/contratos/contratos.component').then((c) => c.ContratosComponent)
    },
    {
        path: 'contratos-administrativo',
        loadComponent: () => import('./features/contratos-administrativo/contratos-administrativo.component').then((c) => c.ContratosAdministrativoComponent)
    },
    {
        path: 'convenios',
        loadComponent: () => import('./features/convenios/convenios.component').then((c) => c.ConveniosComponent)
    },
    {
        path: 'convenios-administrativo',
        loadComponent: () => import('./features/convenios-administrativo/convenios-administrativo.component').then((c) => c.ConveniosAdministrativoComponent)
    },
    {
        path: 'comissoes',
        loadComponent: () => import('./features/comissoes/comissoes.component').then((c) => c.ComissoesComponent)
    },
    {
        path: 'legislacao-municipal',
        loadComponent: () => import('./features/legislacao-municipal/legislacao-municipal.component').then((c) => c.LegislacaoMunicipalComponent)
    },
    {
        path: 'legislacao-municipal-administrativo',
        loadComponent: () => import('./features/legislacao-municipal-administrativo/legislacao-municipal-administrativo.component').then((c) => c.LegislacaoMunicipalAdministrativoComponent)
    },
    {
        path: 'diario-oficial',
        loadComponent: () => import('./features/diario-oficial/diario-oficial.component').then((c) => c.DiarioOficialComponent)
    },
    {
        path: 'dados-da-frota-administrativo',
        loadComponent: () => import('./features/dados-da-frota-administrativo/dados-da-frota-administrativo.component').then((c) => c.DadosDaFrotaAdministrativoComponent)
    },
    {
        path: 'diaria',
        loadComponent: () => import('./features/diaria/diaria.component').then((c) => c.DiariaComponent)
    },
    {
        path: 'editais',
        loadComponent: () => import('./features/editais/editais.component').then((c) => c.EditaisComponent)
    },
    {
        path: 'editais-licitacoes-administrativo',
        loadComponent: () => import('./features/editais-licitacoes-administrativo/editais-licitacoes-administrativo.component').then((c) => c.EditaisLicitacoesAdministrativoComponent)
    },
    {
        path: 'indicacoes-requerimentos',
        loadComponent: () => import('./features/indicacoes-requerimentos/indicacoes-requerimentos.component').then((c) => c.IndicacoesRequerimentosComponent)
    },
    {
        path: 'indicacoes-requerimento-administrativo',
        loadComponent: () => import('./features/indicacoes-requerimento-administrativo/indicacoes-requerimento-administrativo.component').then((c) => c.IndicacoesRequerimentoAdministrativoComponent)
    },
    {
        path: 'indicacao-deliberacao',
        loadComponent: () => import('./features/indicacao-deliberacao/indicacao-deliberacao.component').then((c) => c.IndicacaoDeliberacaoComponent)
    },
    {
        path: 'indicacoes-deliberacoes-administrativo',
        loadComponent: () => import('./features/indicacoes-deliberacoes-administrativo/indicacoes-deliberacoes-administrativo.component').then((c) => c.IndicacoesDeliberacoesAdministrativoComponent)
    },
    {
        path: 'estrutura-organizacional',
        loadComponent: () => import('./features/estrutura-organizacional/estrutura-organizacional.component').then((c) => c.EstruturaOrganizacionalComponent)
    },
    {
        path: 'regimento-interno',
        loadComponent: () => import('./features/regimento-interno/regimento-interno.component').then((c) => c.RegimentoInternoComponent)
    },
    {
        path: 'vereadores',
        loadComponent: () => import('./features/vereadores/vereadores.component').then((c) => c.VereadoresComponent)
    },
    {
        path: 'licitacoes',
        loadComponent: () => import('./features/licitacoes/licitacoes.component').then((c) => c.LicitacoesComponent)
    },
    {
        path: 'licitacoes-administrativo',
        loadComponent: () => import('./features/licitacoes-administrativo/licitacoes-administrativo.component').then((c) => c.LicitacoesAdministrativoComponent)
    },
    {
        path: 'lista-presenca',
        loadComponent: () => import('./features/lista-presenca/lista-presenca.component').then((c) => c.ListaPresencaComponent)
    },
    {
        path: 'mocoes',
        loadComponent: () => import('./features/mocoes/mocoes.component').then((c) => c.MocoesComponent)
    },
    {
        path: 'menu-administrativo',
        loadComponent: () => import('./features/menu-administrativo/menu-administrativo.component').then((c) => c.MenuAdministrativoComponent)
    },
    {
        path: 'oficio',
        loadComponent: () => import('./features/oficio/oficio.component').then((c) => c.OficioComponent)
    },
    {
        path: 'patrimonios-publicos',
        loadComponent: () => import('./features/patrimonios-publicos/patrimonios-publicos.component').then((c) => c.PatrimoniosPublicosComponent)
    },
    {
        path: 'pedidos-providencia',
        loadComponent: () => import('./features/pedidos-providencia/pedidos-providencia.component').then((c) => c.PedidosProvidenciaComponent)
    },
    {
        path: 'rreo-rgf',
        loadComponent: () => import('./features/rreo-rgf/rreo-rgf.component').then((c) => c.RreoRgfComponent)
    },
    {
        path: 'registro-preco',
        loadComponent: () => import('./features/registro-preco/registro-preco.component').then((c) => c.RegistroPrecoComponent)
    },
    {
        path: 'transferencia-recursos',
        loadComponent: () => import('./features/transferencia-recursos/transferencia-recursos.component').then((c) => c.TransferenciaRecursosComponent)
    },
];
