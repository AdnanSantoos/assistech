import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent {
  menuItems = [
    {
      title: 'Cadastrar',
      expanded: false,
      subMenu: [
        { title: 'Cliente', link: '/adm/dashboard-administrativo/cliente' },
        { title: 'Usuário', link: '/adm/dashboard-administrativo/usuarios' },
      ],
    },
    {
      title: 'Diário Oficial',
      link: '/adm/dashboard-administrativo/gerenciar-diario-oficial',
      expanded: false,
      subMenu: [],
    },
    {
      title: 'PNCP',
      expanded: false,
      subMenu: [
        { title: 'Unidades', link: '/adm/pncp-administrativo/unidades' },
        { title: 'Licitações', link: '/adm/pncp-administrativo/licitacoes' },
        { title: 'Contratos', link: '/adm/pncp-administrativo/contratos' },
      ],
    },
    {
      title: 'Portal de Transparência',
      expanded: false,
      subMenu: [
        { title: 'Atas das Sessões', link: '/adm/portal-de-transparencia-administrativo/atas' },
        { title: 'Ações Admissional', link: '/adm/portal-de-transparencia-administrativo/acoes' },
        { title: 'Balanço', link: '/adm/portal-de-transparencia-administrativo/balanco' },
      ],
    },
  ];

  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
