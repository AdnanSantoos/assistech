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
import { DadosAbertosAdministrativoComponent } from './components/dados-abertos-administrativo/dados-abertos-administrativo.component';
import { AdicionarDocumentosAdministrativosComponent } from './components/adicionar-documentos-administrativos/adicionar-documentos-administrativos.component';
import { InformacoesSigilosasAdministrativoComponent } from './components/informacoes-sigilosas-administrativo/informacoes-sigilosas-administrativo.component';
import { LgpdAdministrativoComponent } from './components/lgpd-administrativo/lgpd-administrativo.component';
import { JulgamentoContasAdministrativoComponent } from './components/julgamento-contas-administrativo/julgamento-contas-administrativo.component';
import { CadastrarLdoAdministrativoComponent } from './components/cadastrar-ldo-administrativo/cadastrar-ldo-administrativo.component';
import { CadastrarLoaAdministrativoComponent } from './components/cadastrar-loa-administrativo/cadastrar-loa-administrativo.component';
import { CadastrarLeiOrganicaAdministrativoComponent } from './components/cadastrar-lei-organica-administrativo/cadastrar-lei-organica-administrativo.component';
import { CadastrarListaPreposicoesAdministrativoComponent } from './components/cadastrar-lista-preposicoes-administrativo/cadastrar-lista-preposicoes-administrativo.component';
import { OrdemCronologicaAdministrativoComponent } from './components/ordem-cronologica-administrativo/ordem-cronologica-administrativo.component';
import { OuvidoriaAdministrativoComponent } from './components/ouvidoria-administrativo/ouvidoria-administrativo.component';
import { DadosDaLicitacaoAdministrativoComponent } from './components/dados-da-licitacao-administrativo/dados-da-licitacao-administrativo.component';

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
        path: 'cadastrar-licitacao',
        component: DadosDaLicitacaoAdministrativoComponent,
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
      {
        path: 'adicionar-dados-abertos',
        component: DadosAbertosAdministrativoComponent,
      },
      {
        path: 'adicionar-documentos-administrativos',
        component: AdicionarDocumentosAdministrativosComponent,
      },
      {
        path: 'adicionar-informacoes-sigilosas',
        component: InformacoesSigilosasAdministrativoComponent,
      },
      {
        path: 'adicionar-julgamentos-contas',
        component: JulgamentoContasAdministrativoComponent,
      },
      {
        path: 'adicionar-ldo',
        component: CadastrarLdoAdministrativoComponent,
      },
      {
        path: 'adicionar-loa',
        component: CadastrarLoaAdministrativoComponent,
      },
      {
        path: 'adicionar-lei-organica',
        component: CadastrarLeiOrganicaAdministrativoComponent,
      },
      {
        path: 'adicionar-legislacao',
        component: CadastrarLeiOrganicaAdministrativoComponent,
      },
      {
        path: 'adicionar-lista-preposicao-presenca',
        component: CadastrarListaPreposicoesAdministrativoComponent,
      },
      {
        path: 'adicionar-ordem-cronologica-pagamentos',
        component: OrdemCronologicaAdministrativoComponent,
      },
      {
        path: 'adicionar-ouvidoria',
        component: OuvidoriaAdministrativoComponent,
      },
      {
        path: 'adicionar-lgpd',
        component: LgpdAdministrativoComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PncpAdministrativoRoutingModule {}
