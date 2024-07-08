import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  showCamaraMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
  }
  checkRoute() {
    this.showCamaraMenu = this.router.url === '/portal-transparencia';
  }
}

