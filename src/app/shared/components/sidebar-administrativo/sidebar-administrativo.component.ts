import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss']
})
export class SidebarAdministrativoComponent {
  button2 = [
    {
      name: 'Portal de Transparência',
      externo: '',
      link: '/acesso-informacao-administrativo'
    },
    {
      name: 'pncp',
      externo: '',
      link: '/menu-pncp-administrativo'
    },
    {
      name: 'Diário Oficial',
      externo: '',
      link: '/menu-diario-oficial-administrativo'
    }
  ];

  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      this.sortButtons();
    });
  }

  sortButtons(): void {
    this.button2.sort((a, b) => {
      return this.isActive(b.link) ? 1 : -1;
    });
  }

  isActive(link: string): boolean {
    return this.currentUrl === link;
  }
}
