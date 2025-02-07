import { Injectable, inject } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private router = inject(Router);
  private initialized = new BehaviorSubject<boolean>(false);
  private slug: string | null = null;
  private defaultSlug = 'admin';
  private readonly appPrefix = '/app'; // Novo prefixo

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
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
    console.log('==== NavigationService ====');
    console.log('URL inicial:', url);

    // Nova verificação para evitar processamento duplicado
    if (url.includes('/app/')) {
      console.log('URL já contém /app/, ignorando');
      return;
    }

    const effectiveSlug = this.slug || this.defaultSlug;
    console.log('Slug efetivo:', effectiveSlug);

    // Limpa URL de possíveis duplicações
    const cleanUrl = url.replace(/^\/admin\//, '/').replace(/\/admin\//, '/');
    const newUrl = `${this.appPrefix}/${effectiveSlug}${cleanUrl}`;

    console.log('URL limpa:', cleanUrl);
    console.log('Nova URL gerada:', newUrl);

    if (url !== newUrl) {
      console.log('Navegando para nova URL');
      this.router.navigateByUrl(newUrl, { replaceUrl: true });
    }
  }
}
