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
        path: 'cadastrar-cliente',
        component: CadastrarClienteAdministrativoComponent,
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
