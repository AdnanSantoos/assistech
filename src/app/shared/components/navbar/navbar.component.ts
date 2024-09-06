import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TipoRota } from '../../models/shared.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule,RouterLink],
  providers: [BrowserAnimationsModule],
  animations: [
    trigger('toggleMenu', [
      state('inactive', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('active', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('inactive => active', [
        animate('300ms ease-in')
      ]),
      transition('active => inactive', [
        animate('300ms ease-out')
      ])
    ])
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  mobile = false;
  logoText1: string = '';
  logoText2 = 'Itaberaba';
  tipoRota:TipoRota = null;

  constructor(private router: Router) {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/adm/') || currentUrl.includes('/login')) {
      this.logoText1 = 'Portal Administrativo'
    } else if (currentUrl.includes('/trn/')) {
      this.logoText1 = 'Portal de Transparência'
    } else {
      this.logoText1 = 'Câmara Municipal de'
    }
  }

  toggleMenu() {
    this.mobile = !this.mobile;
  }
  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     if(event.url.includes('/adm/') ||event.url.includes('/login')){
    //       this.logoText1 = 'Portal Administrativo'
    //     }
    //     else if(event.url.includes('/trn/')){
    //       this.logoText1 = 'Portal de Transparência'
    //     }
    //     else{
    //       this.logoText1 = 'Câmara Municipal de'
    //     }
    //   }
    // });
  }

  

}