import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TipoRota } from '../../models/shared.model';
import { LoginModel } from '../../../features/login/models/login.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterLink],
  providers: [BrowserAnimationsModule],
  animations: [
    trigger('toggleMenu', [
      state('inactive', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('inactive => active', [
        animate('300ms ease-in')
      ]),
      transition('active => inactive', [
        animate('300ms ease-out')
      ])
    ])
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  mobile = false;
  logoText1: string = '';
  logoText2 = 'Itaberaba';
  tipoRota: TipoRota = null;
  isAdmRoute = false;
  isLoginRoute = false;
  isDiarioRoute = false;
  isPortalTransparencia = false;
  loggedInUserEmail: string | null = null;

  constructor(private router: Router,private location: Location) {
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  checkRoute(url: string) {
    this.isAdmRoute = url.includes('/adm');
    this.isPortalTransparencia = url.includes('/trn');
    this.isLoginRoute = url.includes('/adm/login');
    this.isDiarioRoute = url.includes('/diario-oficial');
    if (this.isAdmRoute) {
      this.logoText1 = 'Portal Administrativo';
    } else if (this.isPortalTransparencia) {
      this.logoText1 = 'Portal de Transparência';
    } else {
      this.logoText1 = 'DIÁRIO MUNICIPAL DA  CÂMARA DE';
    }
  }

  toggleMenu() {
    this.mobile = !this.mobile;
  }
  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
  getLoggedInUserEmail() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const loginModel: LoginModel = JSON.parse(user);
      this.loggedInUserEmail = loginModel.email;
    }
  }
}
