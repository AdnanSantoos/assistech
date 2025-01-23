import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TenantFullModel, TipoRota } from '../../models/shared.model';
import { TenantService } from '../../services/tenant.service';
import { LoginService } from '../../../features/login/services/login.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { NgxLoadingModule } from 'ngx-loading';

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
export class NavbarComponent implements OnInit, OnDestroy {
  mobile = false;
  logoText1: string = '';
  tenant!: string;
  logoText2 = '';
  tipoRota: TipoRota = null;
  isAdmRoute = false;
  isLoginRoute = false;
  isDiarioRoute = false;
  isPortalTransparencia = false;
  loggedInUserEmail: string | null = null;
  logo: string | null = null;
  state!:TenantFullModel;
  loading = true;
  defaultLogo = '../../../../assets/logos/admin.png';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private location: Location, private tenantService: TenantService, private _loginService: LoginService,
  ) {
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);
    let name = localStorage.getItem('name');
    this.logoText2 = name!;
    this.tenantService.state$
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    )
    .subscribe(v => {
      if (v) {
        this.state = v;
        this.logoText2 = this.state.name;
        this.logo = this.state.logo;
        if(!this.logo){
          this.logo = this.defaultLogo
        }
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
    this.getLoggedInUserEmail();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  onImageError() {
    this.logo = this.defaultLogo;
  }

  navigate() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['adm/dashboard-administrativo/home']);
    } else {
      this.router.navigate(['/adm/login']);
    }
  }

  checkRoute(url: string) {
    this.isAdmRoute = url.includes('/adm/');
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
    this._loginService.logout(this.tenantService.getTenant()!);
  }

  getLoggedInUserEmail(): void {
    // Busca diretamente a chave 'userEmail' no localStorage
    const email = localStorage.getItem('email');
    this.loggedInUserEmail = email ? email : 'Usuário não logado';
  }
}
