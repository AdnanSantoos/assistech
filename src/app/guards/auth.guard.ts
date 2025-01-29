import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TenantService } from '../shared/services/tenant.service';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  slug: string | null = null;
  private destroy$ = new Subject<void>();
  constructor(private router: Router,private tenantService: TenantService) {
      this.tenantService.slug$.pipe(takeUntil(this.destroy$)).subscribe((slug) => {
        if(this.slug){
          return
        }
          this.slug = slug;
      });
  }

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      return true;
    } else {
      this.router.navigate(['/app', this.slug, 'adm', 'login']);
      return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
