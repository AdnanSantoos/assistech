import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { GeneralNewsComponent } from '../../shared/components/general-news/general-news.component';

interface AcessoRapido {
  routerLink?: string;
  texto: string;
  link?: string;
  icon_img:string;
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
        { routerLink: '/diario-oficial', texto: 'DIÁRIO OFICIAL',icon_img:'../../../assets/novos-icones/diario-oficial.svg' },
        { routerLink: '/trn/portal-transparencia', texto: 'PORTAL DE TRANSPARÊNCIA',icon_img:'../../../assets/novos-icones/portal-transparencia.svg' },
        { link: 'https://www.gov.br/pncp/pt-br', texto: 'BIOGRAFIA DA CIDADE',icon_img:'../../../assets/novos-icones/biografia-cidade.svg' },
        { link: 'https://www.gov.br/pncp/pt-br', texto: 'PNCP',icon_img:'../../../assets/novos-icones/pncp.svg' },
        { link: 'https://www.gov.br/compras/pt-br/nllc', texto: 'Lei das Licitações',icon_img:'../../../assets/novos-icones/lei131333.svg' },
        { link: 'https://www.tcm.ba.gov.br/', texto: 'NOTÍCIAS DO TCM',icon_img:'../../../assets/novos-icones/noticias-tcm.svg' },
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
