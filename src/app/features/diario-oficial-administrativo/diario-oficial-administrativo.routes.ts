import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DiarioOficialAdministrativoIndexComponent } from './containers/diario-oficial-administrativo-index/diario-oficial-administrativo-index.component';
import { PublicarDiarioOficialAdministrativoComponent } from './components/publicar-diario-oficial-administrativo/publicar-diario-oficial-administrativo.component';

const routes: Routes = [
    {
        path: '',
        component: DiarioOficialAdministrativoIndexComponent,
        children: [
            {
                path: '',
                redirectTo: 'gerenciar',
                pathMatch: 'full'
            },
            {
                path: 'publicar',
                component: PublicarDiarioOficialAdministrativoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiarioOficialAdministrativoRoutingModule { }
