import { Routes } from '@angular/router';

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
];
