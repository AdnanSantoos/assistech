import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SidebarAdministrativoComponent } from '../../shared/components/sidebar-administrativo/sidebar-administrativo.component';

@Component({
  selector: 'app-menu-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarAdministrativoComponent],
  templateUrl: './menu-diario-oficial-administrativo.component.html',
  styleUrl: './menu-diario-oficial-administrativo.component.scss'
})
export class MenuDiarioOficialAdministrativoComponent {
  button = [
    {
      name: 'Publicar no Diário',
      link: '/publicar-diario-oficial-administrativo'
    },
    {
      name: 'Gerenciador de diários',
      link: '/gerenciador-diario-oficial-administrativo'
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
