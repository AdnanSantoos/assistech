import { RouterModule, Routes } from '@angular/router';
import { DiarioOficialAnosComponent } from './components/diario-oficial-anos/diario-oficial-anos.component';
import { DiarioOficialListagemComponent } from './components/diario-oficial-listagem/diario-oficial-listagem.component';
import { DiarioOficialVisualizacaoComponent } from './components/diario-oficial-visualizacao/diario-oficial-visualizacao.component';
import { NgModule } from '@angular/core';
import { DiarioOficialLayoutComponent } from './containers/diario-oficial-layout/diario-oficial-layout.component';

const routes: Routes = [
    {
        path: '',
        component: DiarioOficialLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'listagem',
                pathMatch: 'full' // Redireciona para 'anos' quando o caminho é vazio
            },
            // {
            //     path: 'anos',
            //     component: DiarioOficialAnosComponent
            // },
            {
                path: 'listagem',
                component: DiarioOficialListagemComponent
            },
            {
                path: 'visualizar',
                component: DiarioOficialVisualizacaoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiarioOficialRoutingModule { }
