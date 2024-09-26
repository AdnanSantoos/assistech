import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent {
  // Objeto para manter o estado dos menus
  expandedMenus: { [key: string]: boolean } = {};

  // Função para alternar a visibilidade do submenu
  toggleSubMenu(menuId: string) {
    this.expandedMenus[menuId] = !this.expandedMenus[menuId];
  }

  // Verifica se o submenu está aberto
  isSubMenuOpen(menuId: string): boolean {
    return !!this.expandedMenus[menuId];
  }
}
