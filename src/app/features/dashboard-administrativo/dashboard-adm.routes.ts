import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { DashboardHomeComponent } from './compontents/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { ClienteAdministrativoComponent } from './compontents/cliente-administrativo/cliente-administrativo.component';
import { CadastrarClienteAdministrativoComponent } from './compontents/cadastrar-cliente-administrativo/cadastrar-cliente-administrativo.component';
import { UsuariosAdministrativoComponent } from './compontents/usuarios-administrativo/usuarios-administrativo.component';
import { CadastrarUsuariosAdministrativoComponent } from './compontents/cadastrar-usuarios-administrativo/cadastrar-usuarios-administrativo.component';
import { GerenciadorDiarioOficialAdministrativoComponent } from './compontents/gerenciador-diario-oficial-administrativo/gerenciador-diario-oficial-administrativo.component';
import { AcessoInformacaoAdministrativoComponent } from './compontents/acesso-informacao-administrativo/acesso-informacao-administrativo.component';
import { UnidadesAdministrativoComponent } from './compontents/unidades-administrativo/unidades-administrativo.component';
import { OrgaoAdministrativoComponent } from './compontents/orgao-administrativo/orgao-administrativo.component';
import { ListaLicitacaoAdministrativoComponent } from './compontents/lista-licitacao-administrativo/lista-licitacao-administrativo.component';
import { ListaContratosAdministrativoComponent } from './compontents/lista-contratos-administrativo/lista-contratos-administrativo.component';
import { PcaAdministrativoComponent } from './compontents/pca-administrativo/pca-administrativo.component';
import { AdicionarPcaComponent } from './compontents/adicionar-pca/adicionar-pca.component';
import { PpaLoaLdoAdministrativoComponent } from './compontents/ppa-loa-ldo-administrativo/ppa-loa-ldo-administrativo.component';
import { CadastrarNoticiasComponent } from './compontents/cadastrar-noticias/cadastrar-noticias.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: DashboardHomeComponent,
      },
      {
        path: 'cliente',
        component: ClienteAdministrativoComponent,
      },
      {
        path: 'unidades',
        component: UnidadesAdministrativoComponent,
      },
      {
        path: 'orgaos',
        component: OrgaoAdministrativoComponent,
      },
      {
        path: 'licitacoes',
        component: ListaLicitacaoAdministrativoComponent,
      },
      {
        path: 'contratos',
        component: ListaContratosAdministrativoComponent,
      },
      {
        path: 'cadastrar-cliente',
        component: CadastrarClienteAdministrativoComponent,
      },
      {
        path: 'cadastrar-pca',
        component: AdicionarPcaComponent,
      },
      {
        path: 'cadastrar-noticia',
        component: CadastrarNoticiasComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosAdministrativoComponent,
      },
      {
        path: 'cadastrar-usuarios',
        component: CadastrarUsuariosAdministrativoComponent,
      },
      {
        path: 'gerenciar-diario-oficial',
        component: GerenciadorDiarioOficialAdministrativoComponent,
      },
      {
        path: 'pca',
        component: PcaAdministrativoComponent,
      },
      {
        path: 'ppa-loa-ldo',
        component: PpaLoaLdoAdministrativoComponent,
      },
      {
        path: 'outros',
        component: AcessoInformacaoAdministrativoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdministrativoRoutingModule {}
