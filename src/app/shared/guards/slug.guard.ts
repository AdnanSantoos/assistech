import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SlugGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const slug = route.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/error']);
      return false;
    }
    return true;
  }
}
