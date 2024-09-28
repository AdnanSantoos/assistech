import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { DashboardHomeComponent } from './compontents/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './containers/dashboard-layout/dashboard-layout.component';
import { ClienteAdministrativoComponent } from './compontents/cliente-administrativo/cliente-administrativo.component';
import { CadastrarClienteAdministrativoComponent } from './compontents/cadastrar-cliente-administrativo/cadastrar-cliente-administrativo.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }, 
            {
                path: 'home',
                component: DashboardHomeComponent
            },
            {
                path:'cliente',
                component:ClienteAdministrativoComponent
            },
            {
                path:'cadastrar-cliente',
                component:CadastrarClienteAdministrativoComponent
            }
         
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardAdministrativoRoutingModule { }
