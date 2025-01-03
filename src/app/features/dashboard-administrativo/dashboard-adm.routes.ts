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
        component: ClienteAdministrativoComponent,
      },
      {
        path: 'unidades',
        component: UnidadesAdministrativoComponent,
      },
      {
        path: 'orgaos',
        component: OrgaoAdministrativoComponent,
      },
      {
        path: 'licitacoes',
        component: ListaLicitacaoAdministrativoComponent,
      },
      {
        path: 'contratos',
        component: ListaContratosAdministrativoComponent,
      },
      {
        path: 'cadastrar-cliente',
        component: CadastrarClienteAdministrativoComponent,
      },
      {
        path: 'editar-cliente/:slug',
        component: CadastrarClienteAdministrativoComponent,
      },
      {
        path: 'cadastrar-pca',
        component: AdicionarPcaComponent,
      },
      {
        path: 'cadastrar-noticia',
        component: CadastrarNoticiasComponent,
      },
      {
        path: 'usuarios',
        component: UsuariosAdministrativoComponent,
      },
      {
        path: 'cadastrar-usuarios',
        component: CadastrarUsuariosAdministrativoComponent,
      },
      {
        path: 'adicionar-termos/:id',
        component: CriarTermosContratosAdministrativoComponent,
      },
      {
        path: 'editar-termos/:termoId',
        component: CriarTermosContratosAdministrativoComponent,
      },        
      {
        path: 'editar-usuarios/:id',
        component: CadastrarUsuariosAdministrativoComponent,
      },
      {
        path: 'editar-licitacoes/:id',
        component: EditarLicitacoesAdministrativoComponent,
      },
      {
        path: 'resultados-licitacoes/:id',
        component: ResultadoLicitacaoComponent,
      },
      {
        path: 'atas-licitacoes/:id',
        component: AtasLicitacoesAdministrativoComponent,
      },
      {
        path: 'termos-contratos/:id',
        component: TermosContratosAdministrativoComponent,
      },
      {
        path: 'itens-licitacoes/:id',
        component: ItensLicitacoesComponent,
      },
      {
        path: 'arquivos-licitacoes/:id',
        component: ArquivosLicitacoesComponent,
      },
      {
        path: 'cadastrar-fotos-diario',
        component: CadastrarFotosDiarioOficialComponent,
      },
      {
        path: 'gerenciar-diario-oficial',
        component: GerenciadorDiarioOficialAdministrativoComponent,
      },
      {
        path: 'gerenciar-noticias',
        component: GerenciadorNoticiaOficialComponent,
      },
      {
        path: 'pca',
        component: PcaAdministrativoComponent,
      },
      {
        path: 'adicionar-orgaos',
        component: AdicionarOrgaoAdministrativoComponent,
      },
      {
        path: 'ppa-loa-ldo',
        component: PpaLoaLdoAdministrativoComponent,
      },
      {
        path: 'outros',
        component: AcessoInformacaoAdministrativoComponent,
      },
      {
        path: 'adicionar-unidades',
        component: AdicionarUnidadesAdministrativoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdministrativoRoutingModule { }
