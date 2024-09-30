import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PncpAdministrativoIndexComponent } from './containers/pncp-administrativo-index/pncp-administrativo-index.component';
import { LicitacoesAdministrativoComponent } from './components/licitacoes-administrativo/licitacoes-administrativo.component';
import { ContratosAdministrativoComponent } from './components/contratos-administrativo/contratos-administrativo.component';
import { AdicionarUnidadesAdministrativoComponent } from './components/adicionar-unidades-administrativo/adicionar-unidades-administrativo.component';
import { AdicionarOrgaoAdministrativoComponent } from './components/adicionar-orgao-administrativo/adicionar-orgao-administrativo.component';

const routes: Routes = [
  {
    path: '',
    component: PncpAdministrativoIndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'orgaos',
        pathMatch: 'full',
      },
      {
        path: 'adicionar-orgaos',
        component: AdicionarOrgaoAdministrativoComponent,
      },
      {
        path: 'adicionar-unidades',
        component: AdicionarUnidadesAdministrativoComponent,
      },
      {
        path: 'licitacoes',
        component: LicitacoesAdministrativoComponent,
      },
      {
        path: 'contratos',
        component: ContratosAdministrativoComponent,
      },
      // {
      //     path: 'pca',
      //     component: ContratosAdministrativoComponent
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PncpAdministrativoRoutingModule {}
