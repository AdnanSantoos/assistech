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

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log(event)
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
    console.log('SLUG:', this.slug);

    // Se a URL já contém o slug, não manipular
    if (url.startsWith(`/${this.slug}/`) || url === `/${this.slug}`) {
      return;
    }

    // Se não estiver em uma rota administrativa ou for rota de login, ignora
    if (!url.includes('/adm') || url.includes('/login')) {
      return;
    }

    const effectiveSlug = this.slug || this.defaultSlug;
    const newUrl = `/${effectiveSlug}${url}`;

    console.log('Nova URL gerada:', newUrl);

    if (url !== newUrl) {
      this.router.navigateByUrl(newUrl, { replaceUrl: true });
    }
  }
}
