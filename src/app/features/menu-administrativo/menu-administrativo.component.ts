import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarAdministrativoComponent } from '../../shared/components/sidebar-administrativo/sidebar-administrativo.component';

@Component({
  selector: 'app-menu-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarAdministrativoComponent],
  templateUrl: './menu-administrativo.component.html',
  styleUrl: './menu-administrativo.component.scss'
})
export class MenuAdministrativoComponent {
  button = [
    {
      name: 'Diário Oficial',
      link: '/menu-diario-oficial-administrativo'
    },
    {
      name: 'PNCP',
      link: '/menu-pncp-administrativo'
    },
  ]

  button2 = [{
    name: 'Portal de Transparência',
    externo: '',
    link: '/acesso-informacao-administrativo'
  },
  {
    name: 'pncp',
    externo: '',
    link: '/pncp-administrativo'
  },
  {
    name: 'Diário Oficial',
    externo: '',
    link: '/diario-oficial-administrativo'
  },]
}
