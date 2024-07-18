import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-diario-oficial',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './diario-oficial.component.html',
  styleUrl: './diario-oficial.component.scss'
})
export class DiarioOficialComponent {
  button = [
    {
      name: '2022',
      link: '/diario-oficial-anos'
    },
    {
      name: '2023',
      link: '/diario-oficial-anos'
    },
    {
      name: '2024',
      link: '/diario-oficial-anos'
    },
  ]
}
