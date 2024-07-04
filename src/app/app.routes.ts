import { Routes } from '@angular/router';
import { AtosAdmissionaisComponent } from './features/atos-admissionais/atos-admissionais.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent:()=> import('./features/home/home.component').then((c)=> c.HomeComponent)
    },
    {
        path: 'acesso-informacao',
        loadComponent:()=> import('./features/acesso-informacao/acesso-informacao.component').then((c)=> c.AcessoInformacaoComponent)
    },
    {
        path: 'ata-das-sessoes',
        loadComponent:()=> import('./features/ata-das-sessoes/ata-das-sessoes.component').then((c)=> c.AtaDasSessoesComponent)
    },
    {
        path: 'atos-admissionais',
        loadComponent:()=> import('./features/atos-admissionais/atos-admissionais.component').then((c)=> c.AtosAdmissionaisComponent)
    },
    {
        path: 'audiencias-publicas',
        loadComponent:()=> import('./features/audiencias-publicas/audiencias-publicas.component').then((c)=> c.AudienciasPublicasComponent)
    }, 
    {
        path: 'balancete-financeiro',
        loadComponent:()=> import('./features/balancete-financeiro/balancete-financeiro.component').then((c)=> c.BalanceteFinanceiroComponent)
    }, 
    {
        path: 'boletim-votacao',
        loadComponent:()=> import('./features/boletim-votacao/boletim-votacao.component').then((c)=> c.BoletimVotacaoComponent)
    },    
    {
        path: 'diario-oficial',
        loadComponent:()=> import('./features/diario-oficial/diario-oficial.component').then((c)=> c.DiarioOficialComponent)
    },
];
