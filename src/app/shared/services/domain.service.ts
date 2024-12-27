import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private extractHostname(url: string): string {
    // Remove protocolo (http:// ou https://)
    let hostname = url.replace(/^(https?:\/\/)/, '');
    
    // Remove porta e caminho
    hostname = hostname.split(':')[0].split('/')[0];
    
    return hostname;
  }

  getDomain(): string {
    if (isPlatformBrowser(this.platformId)) {
      return this.extractHostname(window.location.origin);
    }
    
    if (isPlatformServer(this.platformId)) {
      return this.extractHostname(process.env['DOMAIN'] || 'http://localhost:4200');
    }
    
    return '';
  }

  // Método adicional caso você precise da URL completa em algum momento
  getFullDomain(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.origin;
    }
    
    if (isPlatformServer(this.platformId)) {
      return process.env['DOMAIN'] || 'http://localhost:4200';
    }
    
    return '';
  }
}