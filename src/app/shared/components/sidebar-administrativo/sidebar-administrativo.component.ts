import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatExpansionModule],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent {
}
