import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarAdministrativoComponent } from '../../shared/components/sidebar-administrativo/sidebar-administrativo.component';

@Component({
  selector: 'app-menu-pncp-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarAdministrativoComponent],
  templateUrl: './menu-pncp-administrativo.component.html',
  styleUrl: './menu-pncp-administrativo.component.scss'
})
export class MenuPncpAdministrativoComponent {
  button = [
    {
      name: 'Publicar no PNCP',
      link: '/publicar-pncp-administrativo'
    },
    {
      name: 'gerenciador de pncp',
      link: '/gerenciador-pncp-administrativo'
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
