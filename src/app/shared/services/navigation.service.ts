import { Injectable, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);
  private initialized = new BehaviorSubject<boolean>(false);
  private slug: string | null = null;
  private defaultSlug = 'admin';
  private readonly appPrefix = '/app'; // Novo prefixo


  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event) => {
      if (event instanceof NavigationStart && this.initialized.value) {
        this.handleNavigation(event.url);
      }
    });
  }

  initialize(slug: string | null) {
    this.slug = slug || this.defaultSlug;
    this.initialized.next(true);
  }

  private handleNavigation(url: string): void {
    console.log('URL sendo processada:', url);
    
    // Se já contém /app/slug/, não manipular a URL
    if (url.match(/^\/app\/[^\/]+\//)) {
      return;
    }

    // Se não estiver em uma rota administrativa ou for rota de login, ignora
    if (!url.includes('/adm') || url.includes('/login')) {
      return;
    }

    const effectiveSlug = this.slug || this.defaultSlug;
    const newUrl = `${this.appPrefix}/${effectiveSlug}${url}`;

    console.log('Nova URL gerada:', newUrl);

    if (url !== newUrl) {
      this.router.navigateByUrl(newUrl, { replaceUrl: true });
    }
  }
}