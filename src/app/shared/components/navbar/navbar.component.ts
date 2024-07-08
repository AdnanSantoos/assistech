import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
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
  logoText2: string = '';
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.updateLogoText();
    });
    this.updateLogoText();
  }
  toggleMenu() {
    this.mobile = !this.mobile;
  }

  updateLogoText() {
    const currentUrl = this.router.url;
    if (currentUrl === '/home') {
      this.logoText1 = 'Câmara Municipal de';
      this.logoText2 = 'Itaberaba';
    } else if (currentUrl === '/portal-transparencia') {
      this.logoText1 = 'Portal de Transparência';
      this.logoText2 = 'Itaberaba';
    }
  }
}
