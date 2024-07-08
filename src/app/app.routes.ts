import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
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
        path: 'acesso-informacao-transparencia',
        loadComponent: () => import('./features/acesso-informacao-transparencia/acesso-informacao-transparencia.component').then((c) => c.AcessoInformacaoTransparenciaComponent)
    },
    {
        path: 'ata-das-sessoes',
        loadComponent: () => import('./features/ata-das-sessoes/ata-das-sessoes.component').then((c) => c.AtaDasSessoesComponent)
    },
    {
        path: 'atos-admissionais',
        loadComponent: () => import('./features/atos-admissionais/atos-admissionais.component').then((c) => c.AtosAdmissionaisComponent)
    },
    {
        path: 'audiencias-publicas',
        loadComponent: () => import('./features/audiencias-publicas/audiencias-publicas.component').then((c) => c.AudienciasPublicasComponent)
    },
    {
        path: 'balancete-financeiro',
        loadComponent: () => import('./features/balancete-financeiro/balancete-financeiro.component').then((c) => c.BalanceteFinanceiroComponent)
    },
    {
        path: 'boletim-votacao',
        loadComponent: () => import('./features/boletim-votacao/boletim-votacao.component').then((c) => c.BoletimVotacaoComponent)
    },
    {
        path: 'contratacao-direta',
        loadComponent: () => import('./features/contratacao-direta/contratacao-direta.component').then((c) => c.ContratacaoDiretaComponent)
    },
    {
        path: 'contratos',
        loadComponent: () => import('./features/contratos/contratos.component').then((c) => c.ContratosComponent)
    },
    {
        path: 'convenios',
        loadComponent: () => import('./features/convenios/convenios.component').then((c) => c.ConveniosComponent)
    },
    {
        path: 'legislacao-municipal',
        loadComponent: () => import('./features/legislacao-municipal/legislacao-municipal.component').then((c) => c.LegislacaoMunicipalComponent)
    },
    {
        path: 'diario-oficial',
        loadComponent: () => import('./features/diario-oficial/diario-oficial.component').then((c) => c.DiarioOficialComponent)
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
        path: 'indicacoes-requerimentos',
        loadComponent: () => import('./features/indicacoes-requerimentos/indicacoes-requerimentos.component').then((c) => c.IndicacoesRequerimentosComponent)
    },
    {
        path: 'indicacao-deliberacao',
        loadComponent: () => import('./features/indicacao-deliberacao/indicacao-deliberacao.component').then((c) => c.IndicacaoDeliberacaoComponent)
    },
    {
        path: 'licitacoes',
        loadComponent: () => import('./features/licitacoes/licitacoes.component').then((c) => c.LicitacoesComponent)
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
