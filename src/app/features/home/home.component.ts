import { GeneralNewsComponent } from './../../shared/components/general-news/general-news.component';
import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

interface AcessoRapido {
  routerLink?: string;
  texto: string;
  link?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, GeneralNewsComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  acessos: AcessoRapido[] = [];

  images = [
    { img: '../../../../assets/imgs-home/1.png' },
    { img: '../../../../assets/imgs-home/2.png' },
    { img: '../../../../assets/imgs-home/3.png' },
    { img: '../../../../assets/imgs-home/4.png' },
  ];

  images2 = [
    { img: '../../../../assets/imgs-home/5.png' },
    { img: '../../../../assets/imgs-home/6.png' },
    { img: '../../../../assets/imgs-home/7.png' },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateAcessos(event.urlAfterRedirects);
      }
    });
    this.updateAcessos(this.router.url);
  }

  updateAcessos(url: string) {
    if (url.includes('/home')) {
      this.acessos = [
        { routerLink: '/diario-oficial', texto: 'DIÁRIO OFICIAL' },
        { routerLink: '/trn/portal-transparencia', texto: 'PORTAL DE TRANSPARÊNCIA' },
        { link: 'https://www.gov.br/pncp/pt-br', texto: 'BIOGRAFIA DA CIDADE' },
        { link: 'https://www.gov.br/pncp/pt-br', texto: 'PNCP' },
        { link: 'https://www.gov.br/compras/pt-br/nllc', texto: 'Lei das Licitações' },
        { link: 'https://www.tcm.ba.gov.br/', texto: 'NOTÍCIAS DO TCM' },
      ];
    }
  }
  scrollToNoticias() {
    const noticiasElement = document.getElementById('noticias_gerais');
    if (noticiasElement) {
      noticiasElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
