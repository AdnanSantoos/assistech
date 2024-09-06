import { GeneralNewsComponent } from './../../shared/components/general-news/general-news.component';
import { Component, OnInit } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';

interface AcessoRapido {
  routerLink: string;
  texto: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, GeneralNewsComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  acessos: AcessoRapido[] = [];

  images = [
    { img: '../../../../assets/imgs-home/1.png' },
    { img: '../../../../assets/imgs-home/2.png' },
    { img: '../../../../assets/imgs-home/3.png' },
    { img: '../../../../assets/imgs-home/4.png' },
  ]

  images2 = [
    { img: '../../../../assets/imgs-home/5.png' },
    { img: '../../../../assets/imgs-home/6.png' },
    { img: '../../../../assets/imgs-home/7.png' },
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
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
        { routerLink: '/pncp', texto: 'PNCP' },
        { routerLink: '/lei-14133', texto: 'LEI 14.133' },
        { routerLink: '/noticias-tcm', texto: 'NOTÍCIAS DO TCM' },
        { routerLink: '/biografia-cidade', texto: 'BIOGRAFIA DA CIDADE' },
      ];
    }
  }
}
