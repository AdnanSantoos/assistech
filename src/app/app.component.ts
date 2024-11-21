import { Component, Inject, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { LatestNewsComponent } from './shared/components/latest-news/latest-news.component';
import { CommonModule, isPlatformServer, Location, PlatformLocation } from '@angular/common';
import { TipoRota } from './shared/models/shared.model';
import { TenantService } from './shared/services/tenant.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, MenuComponent, LatestNewsComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'assistech';
  tipoRota: TipoRota = null;
  domain: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private tenantService: TenantService,
    private platformLocation: PlatformLocation,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const currentUrl = this.location.path();

    if (isPlatformServer(this.platformId)) {
      const url = new URL(this.platformLocation.href);
      this.domain = url.hostname;
    } else {
      this.domain = window.location.hostname;
    }

    if (currentUrl.includes('/adm/') || currentUrl.includes('/login')) {
      this.tipoRota = 'adm';
    } else if (currentUrl.includes('/trn/')) {
      this.tipoRota = 'trn';
    } else {
      this.tipoRota = null;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/adm/') || event.url.includes('/login')) {
          this.tipoRota = 'adm';
        } else if (event.url.includes('/trn/')) {
          this.tipoRota = 'trn';
        } else {
          this.tipoRota = null;
        }
      }
    });

    this.tenantService.getTenantData().subscribe(

      (data) => {
        console.log('Dados do serviço:', data);
      },
      (error) => {
        console.error('Erro ao buscar dados do serviço:', error);
      }
    );
  }

  ngOnDestroy(): void {
  }
}
