import { RouterModule, Routes } from '@angular/router';
import { DiarioOficialListagemComponent } from './components/diario-oficial-listagem/diario-oficial-listagem.component';
import { DiarioOficialVisualizacaoComponent } from './components/diario-oficial-visualizacao/diario-oficial-visualizacao.component';
import { NgModule } from '@angular/core';
import { DiarioOficialLayoutComponent } from './containers/diario-oficial-layout/diario-oficial-layout.component';

const routes: Routes = [
    {
        path: 'diario-oficial',
        component: DiarioOficialLayoutComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiarioOficialRoutingModule { }
