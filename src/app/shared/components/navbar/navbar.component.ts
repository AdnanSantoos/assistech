import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class NavbarComponent implements OnInit, OnDestroy {
  mobile = false;
  logoText1: string = '';
  logoText2: string = '';
  private routeSubscription!: Subscription;
  private admUrls: string[] = [
    '/login',
    '/menu-administrativo'
  ];
  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLogoText(event.url);
        this.updateBodyClass(event.url);
      }
    });
    this.updateLogoText(this.router.url);
    this.updateBodyClass(this.router.url);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.mobile = !this.mobile;
  }

  updateLogoText(url: string) {
    if (url === '/home') {
      this.logoText1 = 'Câmara Municipal de';
      this.logoText2 = 'Itaberaba';
    } else if (url === '/portal-transparencia' || url === '/acesso-informacao-transparencia') {
      this.logoText1 = 'Portal de Transparência';
      this.logoText2 = 'Itaberaba';
    } else {
      this.logoText1 = 'Câmara Municipal de';
      this.logoText2 = 'Itaberaba';
    }
    console.log(`Current URL: ${url}`);
  }

  updateBodyClass(url: string) {
    this.renderer.removeClass(document.body, 'home-class');
    this.renderer.removeClass(document.body, 'adm-class');

    if (this.admUrls.includes(url)) {
      this.renderer.addClass(document.body, 'adm-class');
    } 
    else {
      this.renderer.addClass(document.body, 'home-class');
    }
  }
}