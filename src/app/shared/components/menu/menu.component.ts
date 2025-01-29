import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  showCamaraMenu: boolean = false;
  slug: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private router: Router, public route: ActivatedRoute, private tenantService: TenantService) {
    this.tenantService.slug$.pipe(takeUntil(this.destroy$)).subscribe((slug) => {
      this.slug = slug;
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
    this.checkRoute();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  checkRoute() {
    this.showCamaraMenu = this.router.url === '/portal-transparencia' || this.router.url === '/acesso-informacao-transparencia';
  }

  scrollToFooter() {
    const footerElement = document.getElementById('footerLocation');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

