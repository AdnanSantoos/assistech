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

  private extractSlugFromUrl(url: string): string | null {
    // Remove o prefixo 'app' se existir
    const urlWithoutApp = url.replace(this.appPrefix, '');
    
    // Verifica se a URL começa com /adm
    if (!urlWithoutApp.startsWith('/adm')) {
      return null;
    }

    // Divide a URL em partes
    const parts = urlWithoutApp.split('/').filter(part => part);

    // Se tiver partes suficientes e a primeira não for 'adm',
    // significa que já tem um slug
    if (parts.length >= 2 && parts[0] !== 'adm') {
      return parts[0];
    }

    return null;
  }

  private handleNavigation(url: string): void {
    // Se não estiver em uma rota administrativa, ignora
    if (!url.includes('/adm')) {
      return;
    }

    // Remove o prefixo 'app' se existir para fazer a verificação
    const urlWithoutApp = url.replace(this.appPrefix, '');

    // Verifica se já existe um slug na URL
    const existingSlug = this.extractSlugFromUrl(url);
    if (existingSlug) {
      return; // URL já possui um slug, não precisa modificar
    }

    // Se não tem slug na URL, usa o slug atual ou o padrão
    const effectiveSlug = this.slug || this.defaultSlug;
    
    // Adiciona o prefixo 'app' na nova URL
    const newUrl = `${this.appPrefix}/${effectiveSlug}${urlWithoutApp}`;

    // Evita redirecionamento se a URL já estiver correta
    if (url !== newUrl) {
      this.router.navigateByUrl(newUrl, { replaceUrl: true });
    }
  }
}