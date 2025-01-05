// app.component.ts
import { Component, Inject, OnDestroy, OnInit, Optional, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { LatestNewsComponent } from './shared/components/latest-news/latest-news.component';
import { CommonModule, isPlatformServer, Location, PlatformLocation } from '@angular/common';
import { TipoRota } from './shared/models/shared.model';
import { TenantService } from './shared/services/tenant.service';
import { switchMap } from 'rxjs';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from './shared/services/loading.service';
import { DomainService } from './shared/services/domain.service';
import { NavigationService } from './shared/services/navigation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
    LatestNewsComponent,
    CommonModule,
    NgxLoadingModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'assistech';
  tipoRota: TipoRota = null;
  domain: string = '';
  loading: boolean = false;
  loading$ = this._loadingService.loading$;

  constructor(
    private router: Router,
    private location: Location,
    private _loadingService: LoadingService,
    private _domainService: DomainService,
    private tenantService: TenantService,
    private platformLocation: PlatformLocation,
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const currentUrl = this.location.path();
    if (currentUrl.includes('/adm/') || currentUrl.includes('/login')) {
      this.tipoRota = 'adm';
    } else if (currentUrl.includes('/trn/')) {
      this.tipoRota = 'trn';
    } else {
      this.tipoRota = null;
    }
  }

  ngOnInit() {
    const domain = this._domainService.getDomain();
    console.log('Domínio atual:', domain);
    if (domain) {
      this.domain = domain;
    } else {
      this.domain = 'admin';
    }

    // Observa mudanças na navegação
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

    // Inicializa o navigation service após carregar o tenant
    this.tenantService.getTenantData(this.domain).subscribe(data => {
      localStorage.setItem('tenant', data.data.slug);
      this.tenantService.updateState(data.data);
      // Inicializa o navigation service com o slug
      this.navigationService.initialize(data.data.slug);
    });
  }

  ngOnDestroy(): void {
  }

  setLoadingState(isLoading: boolean) {
    this.loading = isLoading;
  }
}
