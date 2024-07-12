import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-administrativo.component.html',
  styleUrl: './menu-administrativo.component.scss'
})
export class MenuAdministrativoComponent {
  button = [
    {
      name: 'Diário Oficial',
      link: '/'
    },
    {
      name: 'PNCP',
      link: '/'
    },]
}
