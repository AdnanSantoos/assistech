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
      expanded: false,
      subMenu: [{ title: 'Publicacoes', link: '/adm/dashboard-administrativo/gerenciar-diario-oficial' },
                { title: 'Noticias', link: '/adm/dashboard-administrativo/cadastrar-noticia' },
                { title: 'Fotos', link: '/adm/dashboard-administrativo/cadastrar-fotos-diario'},
      ],
    },
    {
      title: 'PNCP',
      expanded: false,
      subMenu: [
        { title: 'Órgãos', link: '/adm/dashboard-administrativo/orgaos' },
        { title: 'Unidades', link: '/adm/dashboard-administrativo/unidades' },
        { title: 'Licitações', link: '/adm/dashboard-administrativo/licitacoes' },
        { title: 'Contratos', link: '/adm/dashboard-administrativo/contratos' },
        { title: 'PCA', link: '/adm/dashboard-administrativo/pca' }
      ],
    },
    {
      title: 'Portal de Transparência',
      link: '/adm/dashboard-administrativo/outros',
      expanded: false,
      subMenu: [],
    }

  ];

  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
