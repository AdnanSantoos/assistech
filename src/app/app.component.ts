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
    if (currentUrl.includes('/adm/') || currentUrl.includes('/login')) {
      this.tipoRota = 'adm';
    } else if (currentUrl.includes('/trn/')) {
      this.tipoRota = 'trn';
    } else {
      this.tipoRota = null;
    }
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      const url = new URL(this.platformLocation.href);
      this.domain = url.hostname;
      console.log(url)
    } else {
      this.domain = 'admin';
    }

    localStorage.setItem('tenant', this.domain)

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

    this.tenantService.getTenantData(this.domain).pipe(
      switchMap((data) => {
        this.tenantService.updateState(data.data);
        return this.tenantService.getDados(data.data.slug);
      })
    ).subscribe(
      (dados) => {
        console.log(dados.data.is_staff)
        this.tenantService.updateStateStaff(dados.data.is_staff);
        console.log('Retorno de getDados:', dados);
      },
      (error) => {
        console.error('Erro em uma das chamadas:', error);
      }
    );
  }

  ngOnDestroy(): void {
  }
}
