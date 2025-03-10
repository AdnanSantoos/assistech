// app.component.ts
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { LatestNewsComponent } from './shared/components/latest-news/latest-news.component';
import { CommonModule, Location } from '@angular/common';
import { TipoRota } from './shared/models/shared.model';
import { TenantService } from './shared/services/tenant.service';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingService } from './shared/services/loading.service';
import { NavigationService } from './shared/services/navigation.service';
import { tap } from 'rxjs';

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
    NgxLoadingModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  tipoRota: TipoRota = null;
  domain: string = '';
  loading: boolean = false;
  slug: string | null = null;
  loading$ = this._loadingService.loading$.pipe(
    tap(() => setTimeout(() => this.cdr.markForCheck()))
  );

  constructor(
    private router: Router,
    private location: Location,
    private _loadingService: LoadingService,
    private tenantService: TenantService,
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
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
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verifica se a URL é válida antes de processar
        if (event.url && !event.url.includes('null')) {
          if (!this.slug) {
            this.slug = this.getSlugFromRoute(this.route);
            if (this.slug) {
              this.getTenantData(this.slug);
            }
          }

          if (event.url.includes('/adm/')) {
            this.tipoRota = 'adm';
          } else if (event.url.includes('/trn/')) {
            this.tipoRota = 'trn';
          } else {
            this.tipoRota = null;
          }
        } else if (event.url) {
          console.log('event url', event.url)
          // this.getTenantData(this.slug);
        }
      }
    });
  }

  private getTenantData(slug: string) {
    // Inicializa o navigation service após carregar o tenant
    this.tenantService.getTenantData(this.slug!).subscribe(
      (data) => {
        this.tenantService.setSlug(data.data.slug);
        this.tenantService.updateState(data.data);
        // Inicializa o navigation service com o slug
        this.navigationService.initialize(data.data.slug);
      },
      (error) => {
        this.router.navigate(['error']);
      }
    );
  }

  private getSlugFromRoute(route: ActivatedRoute): string | null {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.paramMap.get('slug');
  }

  setLoadingState(isLoading: boolean) {
    this.loading = isLoading;
  }

  ngOnDestroy(): void {
    localStorage.clear()
  }
}
