import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PortalDeTransparenciaAdministrativoIndexComponent } from './containers/portal-de-transparencia-administrativo-index/portal-de-transparencia-administrativo-index.component';
import { AtasSessaoAdministrativoComponent } from './components/atas-sessao-administrativo/atas-sessao-administrativo.component';
import { AtosAdmissionaisAdministrativoComponent } from './components/atos-admissionais-administrativo/atos-admissionais-administrativo.component';
import { AudienciaPublicaAdministrativoComponent } from './components/audiencia-publica-administrativo/audiencia-publica-administrativo.component';
import { BalancoAdministrativoComponent } from './components/balanco-administrativo/balanco-administrativo.component';
import { AcessoInformacaoAdministrativoComponent } from '../acesso-informacao-administrativo/acesso-informacao-administrativo.component';

const routes: Routes = [
  {
    path: '',
    component: PortalDeTransparenciaAdministrativoIndexComponent,
    children: [
      {
        path: '',
        redirectTo: 'ata-das-sessoes',
        pathMatch: 'full',
      },
      {
        path: 'ata-das-sessoes',
        component: AtasSessaoAdministrativoComponent,
      },
      {
        path: 'atos-admissionais',
        component: AtosAdmissionaisAdministrativoComponent,
      },
      {
        path: 'audiencia-publica',
        component: AudienciaPublicaAdministrativoComponent,
      },
      {
        path: 'balancete',
        component: BalancoAdministrativoComponent,
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
export class PortaldeTransparenciaAdministrativoRoutingModule {}
