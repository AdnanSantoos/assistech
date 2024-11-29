import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isAdmRoute = false;
  checkRoute(url: string) {
    this.isAdmRoute = url.includes('/adm');
  }
  constructor(private location: Location) {
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);

  }
}
