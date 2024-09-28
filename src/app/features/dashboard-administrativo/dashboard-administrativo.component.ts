import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarAdministrativoComponent } from '../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard-administrativo',
  standalone: true,
  imports: [CommonModule,SidebarAdministrativoComponent,NavbarComponent],
  templateUrl: './dashboard-administrativo.component.html',
  styleUrl: './dashboard-administrativo.component.scss'
})
export class DashboardAdministrativoComponent {
  categorias = [
    { nome: 'Documentos', quantidade: 450 },
    { nome: 'Usuários', quantidade: 1230 },
    { nome: 'Publicações', quantidade: 4230 },
    { nome: 'Órgãos', quantidade: 20 },
    { nome: 'Contratos', quantidade: 75 },
    { nome: 'Licitações', quantidade: 5 },
    { nome: 'Unidades', quantidade: 12 },
    { nome: 'Planos de Contratação', quantidade: 15 },
    { nome: 'Termos', quantidade: 8 },

  ];

  isLastTwo(index: number): boolean {
    const total = this.categorias.length;
    const isEven = total % 2 === 0;
    return isEven && (index === total - 1 || index === total - 2);
  }

}
