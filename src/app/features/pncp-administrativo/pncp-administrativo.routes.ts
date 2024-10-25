import { AdicionarComissoesAdministrativoComponent } from './components/adicionar-comissoes-administrativo/adicionar-comissoes-administrativo.component';
import { AgendaDoPresidenteAdministrativoComponent } from './components/agenda-do-presidente-administrativo/agenda-do-presidente-administrativo.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PncpAdministrativoIndexComponent } from './containers/pncp-administrativo-index/pncp-administrativo-index.component';
import { LicitacoesAdministrativoComponent } from './components/licitacoes-administrativo/licitacoes-administrativo.component';
import { ContratosAdministrativoComponent } from './components/contratos-administrativo/contratos-administrativo.component';
import { AdicionarUnidadesAdministrativoComponent } from './components/adicionar-unidades-administrativo/adicionar-unidades-administrativo.component';
import { AdicionarOrgaoAdministrativoComponent } from './components/adicionar-orgao-administrativo/adicionar-orgao-administrativo.component';
import { CartaDeServicosAdministrativoComponent } from './components/carta-de-servicos-administrativo/carta-de-servicos-administrativo.component';
import { CotasParaServicoParlamentarAdministrativoComponent } from './components/cotas-para-servico-parlamentar-administrativo/cotas-para-servico-parlamentar-administrativo.component';

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
        path: 'adicionar-licitacoes',
        component: LicitacoesAdministrativoComponent,
      },
      {
        path: 'adicionar-contratos',
        component: ContratosAdministrativoComponent,
      },
      {
        path: 'adicionar-agenda-do-presidente',
        component: AgendaDoPresidenteAdministrativoComponent,
      },
      {
        path: 'adicionar-carta-servicos',
        component: CartaDeServicosAdministrativoComponent,
      },
      {
        path: 'adicionar-comissoes',
        component: AdicionarComissoesAdministrativoComponent,
      },
      {
        path: 'adicionar-cotas-para-servico-parlamentar',
        component: CotasParaServicoParlamentarAdministrativoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PncpAdministrativoRoutingModule {}
