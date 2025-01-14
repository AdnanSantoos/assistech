import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { GeneralNewsComponent } from '../../shared/components/general-news/general-news.component';
import { TenantService } from '../../shared/services/tenant.service';
import { filter, Subscription, switchMap } from 'rxjs';
import { CadastrarFotosAdministrativoService } from '../dashboard-administrativo/compontents/cadastrar-fotos-diario-oficial/services/cadastrar-foto-administrativo.service';
import { PhotoForm } from '../dashboard-administrativo/compontents/cadastrar-fotos-diario-oficial/model/cadastrar-foto.model';

interface AcessoRapido {
  routerLink?: string;
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

  images: { url: string }[] = []; // Initialize as an empty array
  defaultImages = [
    { url: '../../../../assets/imgs-home/1.png' },
    { url: '../../../../assets/imgs-home/2.png' },
    { url: '../../../../assets/imgs-home/3.png' },
    { url: '../../../../assets/imgs-home/4.png' },
  ];

  images2 = [
    { img: '../../../../assets/imgs-home/5.png' },
    { img: '../../../../assets/imgs-home/6.png' },
    { img: '../../../../assets/imgs-home/7.png' },
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private _tenantService: TenantService,
    private _cadastrarFotosAdministrativoService: CadastrarFotosAdministrativoService
  ) {}

  ngOnInit(): void {
    const sub = this._tenantService.slug$
      .pipe(
        filter((slug): slug is string => !!slug), // Ensure slug is a string
        switchMap((slug) =>
          this._cadastrarFotosAdministrativoService.getRecentPhotos(slug)
        )
      )
      .subscribe((response: { data: PhotoForm[] }) => {
        // Adjust the type to match the API response
        const data = response.data; // Access the data property

        // Check if data is an array and filter out photos with undefined URLs
        if (Array.isArray(data)) {
          const validPhotos = data.filter(
            (photo): photo is PhotoForm => photo.url !== undefined
          );

          if (validPhotos.length > 0) {
            this.images = validPhotos.map((photo) => ({ url: photo.url! })); // Use non-null assertion
          } else {
            this.images = this.defaultImages; // Use default images if no valid data
          }
        } else {
          this.images = this.defaultImages; // Use default images if data is not an array
        }
      });

    this.subscription.add(sub);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateAcessos(event.urlAfterRedirects);
      }
    });
    this.updateAcessos(this.router.url);

    const slugSub = this._tenantService.slug$
      .pipe(filter((slug): slug is string => slug !== null)) // Ensure slug is a string
      .subscribe((slug) => {
        this.currentSlug = slug;
        this.updateAcessos(this.router.url);
      });

    this.subscription.add(slugSub);
  }

  updateAcessos(url: string) {
    if (url.includes('/home')) {
      this.acessos = [
        {
          routerLink: `/${this.currentSlug}/diario-oficial`,
          texto: 'DIÁRIO OFICIAL',
          icon_img: '../../../assets/novos-icones/diario-oficial.svg',
        },
        {
          routerLink: `/${this.currentSlug}/trn/portal-transparencia`,
          texto: 'PORTAL DE TRANSPARÊNCIA',
          icon_img: '../../../assets/novos-icones/portal-transparencia.svg',
        },
        {
          link: 'https://www.gov.br/pt-br',
          texto: '',
          icon_img:
            'https://www.gov.br/++theme++padrao_govbr/img/govbr-logo-large.png',
        },
        {
          link: 'https://www.gov.br/pncp/pt-br',
          texto: 'PNCP',
          icon_img: '../../../assets/novos-icones/pncp.svg',
        },
        {
          link: 'https://www.gov.br/compras/pt-br/nllc',
          texto: 'Lei das Licitações',
          icon_img: '../../../assets/novos-icones/lei131333.svg',
        },
        {
          link: 'https://portal.tcu.gov.br/inicio',
          texto: 'NOTÍCIAS DO TCU',
          icon_img: '../../../assets/logos/Tcu.svg',
        },
      ];
    }
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
