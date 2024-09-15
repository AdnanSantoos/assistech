import { OrgaoAdministrativoComponent } from './components/orgao-administrativo/orgao-administrativo.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PncpAdministrativoIndexComponent } from './containers/pncp-administrativo-index/pncp-administrativo-index.component';
import { UnidadesAdministrativoComponent } from './components/unidades-administrativo/unidades-administrativo.component';
import { LicitacoesAdministrativoComponent } from './components/licitacoes-administrativo/licitacoes-administrativo.component';
import { ContratosAdministrativoComponent } from './components/contratos-administrativo/contratos-administrativo.component';

const routes: Routes = [
    {
        path: '',
        component: PncpAdministrativoIndexComponent,
        children: [
            {
                path: '',
                redirectTo: 'orgaos',
                pathMatch: 'full'
            },
            {
                path: 'orgaos',
                component: OrgaoAdministrativoComponent
            },
            {
                path: 'unidades',
                component: UnidadesAdministrativoComponent
            },
            {
                path: 'licitacoes',
                component: LicitacoesAdministrativoComponent
            },
            {
                path: 'contratos',
                component: ContratosAdministrativoComponent
            },
            // {
            //     path: 'pca',
            //     component: ContratosAdministrativoComponent
            // },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PncpAdministrativoRoutingModule { }
