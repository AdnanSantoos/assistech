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
  selector: 'app-home-transparencia',
  standalone: true,
  imports: [SliderComponent, GeneralNewsComponent, CommonModule, RouterLink],
  templateUrl: './home-transparencia.component.html',
  styleUrl: './home-transparencia.component.scss'
})


export class HomeTransparenciaComponent implements OnInit {
  acessos: AcessoRapido[] = [];

  images = [
    { img: '../../../../assets/imgs-home/1.png' },
    { img: '../../../../assets/imgs-home/2.png' },
    { img: '../../../../assets/imgs-home/3.png' },
    { img: '../../../../assets/imgs-home/4.png' },
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
    if (url.includes('/portal-transparencia')) {
      this.acessos = [
        { routerLink: '/transparencia-despesas', texto: 'AGENDA DO PRESIDENTE' },
        { routerLink: '/transparencia-receitas', texto: 'BALANÇO GERAL' },
        { routerLink: '/transparencia-contratos', texto: 'BALANCETE FINANCEIRO' },
        { routerLink: '/transparencia-licitacoes', texto: 'CARTA DE SERVIÇOS AO USUÁRIO' },
        { routerLink: '/transparencia-servidores', texto: 'COMISSÕES' },
        { routerLink: '/transparencia-relatorios', texto: 'CONVÊNIOS' },
      ];
    } 
  }
}
