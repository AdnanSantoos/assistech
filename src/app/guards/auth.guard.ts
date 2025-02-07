import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TenantService } from '../shared/services/tenant.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private tenantService: TenantService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('authToken');

    // Procura o parâmetro slug em todos os segmentos da rota
    let slug: string | null = null;
    let currentRoute: ActivatedRouteSnapshot | null = route;

    while (currentRoute) {
      if (currentRoute.params['slug']) {
        slug = currentRoute.params['slug'];
        break;
      }
      currentRoute = currentRoute.parent;
    }

    if (!token) {
      if (slug) {
        this.router.navigate([slug, 'adm', 'login']);
      } else {
        console.error('Não foi possível obter o slug da rota');
        this.router.navigate(['/error']);
      }
      return false;
    }

    return true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
