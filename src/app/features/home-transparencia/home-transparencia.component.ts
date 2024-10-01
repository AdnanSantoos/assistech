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

  mainNews = [
    {
      img: '../../../../assets/temporarias/guamaense.png',
      title: 'Entrega de Título Cidadão Guamaense',
      description: 'O Presidente da Câmara Municipal de São Miguel do Guamá...'
    },
    {
      img: '../../../../assets/temporarias/ordem-de-servico.png',
      title: 'Ordem de serviço para a reforma completa e ampliação da Escola Benedito Valente, comunidade do Cristo Rei',
      description: 'Em mais uma significativa conquista para a nossa educação...'
    }
  ];

  sidebarNews = [
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '1 de fevereiro de 2024',
      title: 'Comunicado'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '19 de janeiro de 2024',
      title: 'Sessão de abertura das atividades Legislativas de 2024'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '7 de setembro de 2023',
      title: 'Desfile cívico'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '3 de agosto de 2023',
      title: 'Presidente e vice Presidente da câmara municipal participam do Fórum...'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '2 de agosto de 2023',
      title: 'Vídeo: 1ª Sessão Ordinária – 02 de agosto 2023'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '2 de agosto de 2023',
      title: 'Sessão Solene de Abertura 2º Período Legislativo – 02/08/2023'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '29 de junho de 2023',
      title: '24ª Sessão Ordinária 28 de junho 2023'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      date: '23 de junho de 2023',
      title: '23ª Sessão Ordinária – 21.06.2023'
    }
  ];

  vereadores = [
    {
      img: '../../../../assets/temporarias/ana.png',
      name: 'Ana Domingas Pontes de Almeida'
    },
    {
      img: '../../../../assets/temporarias/claudio.png',
      name: 'Cláudio Castelo Branco de Sousa Junior'
    },
    {
      img: '../../../../assets/temporarias/jose.png',
      name: 'José Gleison da Silva Conceição'
    }
  ];

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
        { routerLink: '/trn/agenda-presidente', texto: 'AGENDA DO PRESIDENTE' },
        { routerLink: '', texto: 'BALANÇO GERAL' },
        { routerLink: '/balancete-financeiro', texto: 'BALANCETE FINANCEIRO' },
        { routerLink: '', texto: 'CARTA DE SERVIÇOS AO USUÁRIO' },
        { routerLink: '/trn/comissoes', texto: 'COMISSÕES' },
        { routerLink: '/diario-oficial/anos', texto: 'DIÁRIO OFICIAL' },
      ];
    }
  }
}
