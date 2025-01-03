import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent implements OnInit {

  public isStaff: boolean | null = null;
  public menuItems: any;


  ngOnInit(): void {
    this.isStaff = this.tenantService.getStaff()
    this.menuItems = [
      {
        title: 'Cadastrar',
        expanded: false,
        subMenu: [
          { title: 'Cliente', link: '/adm/dashboard-administrativo/cliente', visible: this.isStaff },
          { title: 'Usuário', link: '/adm/dashboard-administrativo/usuarios', visible: this.isStaff },
          { title: 'Imagens', link: '/adm/dashboard-administrativo/cadastrar-fotos-diario', visible: true },
        ],
      },
      {
        title: 'Diário Oficial',
        expanded: false,
        subMenu: [{ title: 'Publicacoes', link: '/adm/dashboard-administrativo/gerenciar-diario-oficial', visible: true },
        ],
      },
      {
        title: 'PNCP',
        expanded: false,
        subMenu: [
          { title: 'Órgãos', link: '/adm/dashboard-administrativo/orgaos', visible: true },
          { title: 'Unidades', link: '/adm/dashboard-administrativo/unidades', visible: true },
          { title: 'Licitações', link: '/adm/dashboard-administrativo/licitacoes', visible: true },
          { title: 'Contratos', link: '/adm/dashboard-administrativo/contratos', visible: true },
          { title: 'PCA', link: '/adm/dashboard-administrativo/pca', visible: true }
        ],
      },
      {
        title: 'Portal de Transparência',
        link: '/adm/dashboard-administrativo/outros',
        expanded: false,
        subMenu: [],
      }

    ];
  }

  constructor(public tenantService: TenantService) {
  }


  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
