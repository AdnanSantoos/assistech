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
        { title: 'Atas das Sessões', link: '/adm/portal-de-transparencia-administrativo/ata-das-sessoes' },
        { title: 'Atos Admissionais', link: '/adm/portal-de-transparencia-administrativo/atos-admissionais' },
        { title: 'Audiência Pública', link: '/adm/portal-de-transparencia-administrativo/audiencia-publica' },
        { title: 'Balancete', link: '/adm/portal-de-transparencia-administrativo/balancete' },
        { title: 'Outros', link: '/adm/dashboard-administrativo/outros' },
      ],
    },
  ];

  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
