import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SlugService {
  private tenantSlug: string | null = null;

  // Define o slug do tenant
  setSlug(slug: string): void {
    this.tenantSlug = slug;
    localStorage.setItem('tenantSlug', slug); // Salvar no localStorage (opcional)
  }

  // Obtém o slug do tenant
  getSlug(): string | null {
    return this.tenantSlug || localStorage.getItem('tenantSlug');
  }

  // Constrói URLs com o slug
  buildUrl(path: string): string {
    const slug = this.getSlug();
    return slug ? `/${slug}/${path}` : `/${path}`;
  }
}
