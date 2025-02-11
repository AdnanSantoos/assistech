import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { GeneralNewsComponent } from '../../shared/components/general-news/general-news.component';
import { TenantService } from '../../shared/services/tenant.service';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { CadastrarFotosAdministrativoService } from '../dashboard-administrativo/compontents/cadastrar-fotos-diario-oficial/services/cadastrar-foto-administrativo.service';
import { PhotoForm } from '../dashboard-administrativo/compontents/cadastrar-fotos-diario-oficial/model/cadastrar-foto.model';

interface AcessoRapido {
  routerLink?: string[];
  texto: string;
  link?: string;
  icon_img: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, GeneralNewsComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  acessos: AcessoRapido[] = [];
  private subscription = new Subscription();
  currentSlug: string = '';
  tenantData: any = null;

  images: { url: string }[] = [];
  defaultImages = [
    { url: '/app/assets/imgs-home/1.jpg' },
    { url: '/app/assets/imgs-home/2.jpg' },
    { url: '/app/assets/imgs-home/3.png' },
    { url: '/app/assets/imgs-home/4.jpg' },
  ];

  images2 = [
    { img: '/app/assets/imgs-home/5.png' },
    { img: '/app/assets/imgs-home/6.png' },
    { img: '/app/assets/imgs-home/7.png' },
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private _tenantService: TenantService,
    private _cadastrarFotosAdministrativoService: CadastrarFotosAdministrativoService
  ) {}

  ngOnInit(): void {
    // Subscribe to slug changes and fetch tenant data
    const slugSub = this._tenantService.slug$
      .pipe(
        filter((slug): slug is string => slug !== null),
        tap(slug => {
          console.log('Slug received:', slug);
          this.currentSlug = slug;
        }),
        switchMap(slug =>
          this._tenantService.getTenantData(slug).pipe(
            tap(response => {
              console.log('Tenant data received:', response);
              this.tenantData = response.data;
            }),
            switchMap(() => this._cadastrarFotosAdministrativoService.getRecentPhotos(slug))
          )
        )
      )
      .subscribe({
        next: (response: { data: PhotoForm[] }) => {
          const data = response.data;
          if (Array.isArray(data)) {
            const validPhotos = data.filter(
              (photo): photo is PhotoForm => photo.url !== undefined
            );
            this.images = validPhotos.length > 0
              ? validPhotos.map(photo => ({ url: photo.url! }))
              : this.defaultImages;
          } else {
            this.images = this.defaultImages;
          }
          this.updateAcessos(this.router.url);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.images = this.defaultImages;
        }
      });

    this.subscription.add(slugSub);

    // Subscribe to router events
    const routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateAcessos(event.urlAfterRedirects);
        }
      });

    this.subscription.add(routerSub);
  }

  updateAcessos(url: string) {
    if (!url.includes('/home')) return;

    const baseAcessos: AcessoRapido[] = [
      {
        routerLink: ['/', this.currentSlug, 'diario-oficial'],
        texto: 'DIÁRIO OFICIAL',
        icon_img: '/app/assets/novos-icones/diario-oficial.svg',
      }
    ];

    // Add either Portal de Transparência or ATRICON based on previous_transparent_link
    if (this.tenantData?.previous_transparent_link) {
      baseAcessos.push({
        routerLink: [`/${this.currentSlug}/trn/portal-transparencia`],
        texto: 'PORTAL DE TRANSPARÊNCIA',
        icon_img: '/app/assets/novos-icones/portal-transparencia.svg',
      });
    } else {
      baseAcessos.push({
        link: 'https://atricon.org.br/',
        texto: 'ATRICON',
        icon_img: '/app/assets/novos-icones/atricon-logo.svg',
      });
    }

    // Add remaining static links
    baseAcessos.push(
      {
        link: 'https://www.gov.br/pt-br',
        texto: '',
        icon_img: 'https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png',
      },
      {
        link: 'https://www.gov.br/pncp/pt-br',
        texto: 'PNCP',
        icon_img: '/app/assets/novos-icones/nova_pncp.svg',
      },
      {
        link: 'https://www.gov.br/compras/pt-br/nllc',
        texto: 'Lei das Licitações',
        icon_img: '/app/assets/novos-icones/lei131333.svg',
      },
      {
        link: 'https://portal.tcu.gov.br/inicio',
        texto: 'NOTÍCIAS DO TCU',
        icon_img: '/app/assets/logos/Tcu.svg',
      }
    );

    this.acessos = baseAcessos;
  }

  scrollToNoticias() {
    const noticiasElement = document.getElementById('noticias_gerais');
    if (noticiasElement) {
      noticiasElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
