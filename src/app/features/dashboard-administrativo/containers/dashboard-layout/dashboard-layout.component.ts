import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarAdministrativoComponent } from '../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  standalone:true,
  imports:[CommonModule,SidebarAdministrativoComponent,NavbarComponent,RouterModule],
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
