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
import { ListaLicitacaoAdministrativoComponent } from './compontents/lista-licitacao-administrativo/lista-licitacao-administrativo.component';
import { ListaContratosAdministrativoComponent } from './compontents/lista-contratos-administrativo/lista-contratos-administrativo.component';
import { PcaAdministrativoComponent } from './compontents/pca-administrativo/pca-administrativo.component';
import { AdicionarPcaComponent } from './compontents/adicionar-pca/adicionar-pca.component';
import { PpaLoaLdoAdministrativoComponent } from './compontents/ppa-loa-ldo-administrativo/ppa-loa-ldo-administrativo.component';
import { CadastrarNoticiasComponent } from './compontents/cadastrar-noticias/cadastrar-noticias.component';
import { CadastrarFotosDiarioOficialComponent } from './compontents/cadastrar-fotos-diario-oficial/cadastrar-fotos-diario-oficial.component';
import { GerenciadorNoticiaOficialComponent } from './compontents/gerenciador-noticia-oficial/gerenciador-noticia-oficial.component';
import { EditarLicitacoesAdministrativoComponent } from './compontents/lista-licitacao-administrativo/editar-licitacoes/editar-licitacoes-administrativo/editar-licitacoes-administrativo.component';
import { ItensLicitacoesComponent } from './compontents/lista-licitacao-administrativo/itens-licitacoes/itens-licitacoes/itens-licitacoes.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ArquivosLicitacoesComponent } from './compontents/lista-licitacao-administrativo/arquivos-licitacoes/arquivos-licitacoes/arquivos-licitacoes.component';
import { AtasLicitacoesAdministrativoComponent } from './compontents/lista-licitacao-administrativo/atas-licitacoes-administrativo/atas-licitacoes-administrativo.component';
import { ResultadoLicitacaoComponent } from './compontents/lista-licitacao-administrativo/itens-licitacoes/resultado-licitacao/resultado-licitacao.component';
import { TermosContratosAdministrativoComponent } from './compontents/lista-contratos-administrativo/termos-contratos-administrativo/termos-contratos-administrativo.component';
import { CriarTermosContratosAdministrativoComponent } from './compontents/lista-contratos-administrativo/criar-termos-contratos-administrativo/criar-termos-contratos-administrativo.component';
import { AdicionarOrgaoAdministrativoComponent } from './compontents/adicionar-orgao-administrativo/adicionar-orgao-administrativo.component';
import { AdicionarUnidadesAdministrativoComponent } from '../pncp-administrativo/components/adicionar-unidades-administrativo/adicionar-unidades-administrativo.component';
import { PublicarDiarioOficialAdministrativoComponent } from '../diario-oficial-administrativo/components/publicar-diario-oficial-administrativo/publicar-diario-oficial-administrativo.component';
import { DadosDaLicitacaoAdministrativoComponent } from '../pncp-administrativo/components/dados-da-licitacao-administrativo/dados-da-licitacao-administrativo.component';
import { ContratosAdministrativoComponent } from '../pncp-administrativo/components/contratos-administrativo/contratos-administrativo.component';
import { EditarContratoAdministrativoComponent } from '../pncp-administrativo/components/contratos-administrativo/editar-contrato-administrativo/editar-contrato-administrativo.component';

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
        canActivate: [AuthGuard],
        component: DashboardHomeComponent,
      },
      {
        path: 'cliente',
        canActivate: [AuthGuard],
        component: ClienteAdministrativoComponent,
      },
      {
        path: 'unidades',
        canActivate: [AuthGuard],
        component: UnidadesAdministrativoComponent,
      },
      {
        path: 'orgaos',
        canActivate: [AuthGuard],
        component: OrgaoAdministrativoComponent,
      },
      {
        path: 'licitacoes',
        canActivate: [AuthGuard],
        component: ListaLicitacaoAdministrativoComponent,
      },
      {
        path: 'contratos',
        canActivate: [AuthGuard],
        component: ListaContratosAdministrativoComponent,
      },
      {
        path: 'cadastrar-cliente',
        canActivate: [AuthGuard],
        component: CadastrarClienteAdministrativoComponent,
      },
      {
        path: 'editar-cliente/:slug',
        canActivate: [AuthGuard],
        component: CadastrarClienteAdministrativoComponent,
      },
      {
        path: 'cadastrar-pca',
        canActivate: [AuthGuard],
        component: AdicionarPcaComponent,
      },
      {
        path: 'editar-pca/:id',
        canActivate: [AuthGuard],
        component: AdicionarPcaComponent,
      },
      {
        path: 'cadastrar-noticia',
        canActivate: [AuthGuard],
        component: CadastrarNoticiasComponent,
      },
      {
        path: 'cadastrar-licitacao',
        canActivate: [AuthGuard],
        component: DadosDaLicitacaoAdministrativoComponent,
      },
      {
        path: 'adicionar-contratos',
        canActivate: [AuthGuard],
        component: ContratosAdministrativoComponent,
      },
      {
        path: 'editar-contratos/:id',
        canActivate: [AuthGuard],
        component: EditarContratoAdministrativoComponent,
      },
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        component: UsuariosAdministrativoComponent,
      },
      {
        path: 'cadastrar-usuarios',
        canActivate: [AuthGuard],
        component: CadastrarUsuariosAdministrativoComponent,
      },
      {
        path: 'adicionar-termos/:id',
        canActivate: [AuthGuard],
        component: CriarTermosContratosAdministrativoComponent,
      },
      {
        path: 'editar-termos/:termoId',
        canActivate: [AuthGuard],
        component: CriarTermosContratosAdministrativoComponent,
      },
      {
        path: 'editar-usuarios/:id',
        canActivate: [AuthGuard],
        component: CadastrarUsuariosAdministrativoComponent,
      },
      {
        path: 'editar-licitacoes/:id',
        canActivate: [AuthGuard],
        component: EditarLicitacoesAdministrativoComponent,
      },
      {
        path: 'resultados-licitacoes/:id',
        canActivate: [AuthGuard],
        component: ResultadoLicitacaoComponent,
      },
      {
        path: 'atas-licitacoes/:id',
        canActivate: [AuthGuard],
        component: AtasLicitacoesAdministrativoComponent,
      },
      {
        path: 'termos-contratos/:id',
        canActivate: [AuthGuard],
        component: TermosContratosAdministrativoComponent,
      },
      {
        path: 'itens-licitacoes/:id',
        canActivate: [AuthGuard],
        component: ItensLicitacoesComponent,
      },
      {
        path: 'arquivos-licitacoes/:id',
        canActivate: [AuthGuard],
        component: ArquivosLicitacoesComponent,
      },
      {
        path: 'cadastrar-fotos-diario',
        canActivate: [AuthGuard],
        component: CadastrarFotosDiarioOficialComponent,
      },
      {
        path: 'gerenciar-diario-oficial',
        canActivate: [AuthGuard],
        component: GerenciadorDiarioOficialAdministrativoComponent,
      },
      {
        path: 'publicar-diario-oficial',
        canActivate: [AuthGuard],
        component: PublicarDiarioOficialAdministrativoComponent,
      },
      {
        path: 'gerenciar-noticias',
        canActivate: [AuthGuard],
        component: GerenciadorNoticiaOficialComponent,
      },
      {
        path: 'pca',
        canActivate: [AuthGuard],
        component: PcaAdministrativoComponent,
      },
      {
        path: 'adicionar-orgaos',
        canActivate: [AuthGuard],
        component: AdicionarOrgaoAdministrativoComponent,
      },
      {
        path: 'ppa-loa-ldo',
        canActivate: [AuthGuard],
        component: PpaLoaLdoAdministrativoComponent,
      },
      {
        path: 'outros',
        canActivate: [AuthGuard],
        component: AcessoInformacaoAdministrativoComponent,
      },
      {
        path: 'adicionar-unidades',
        canActivate: [AuthGuard],
        component: AdicionarUnidadesAdministrativoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdministrativoRoutingModule {}
