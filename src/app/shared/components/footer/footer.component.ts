import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { ExibirClienteData } from '../../../features/dashboard-administrativo/model/cliente.model';
import { CommonModule } from '@angular/common';
import { TenantFullModel } from '../../models/shared.model';
import { Subject, finalize, takeUntil } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  clienteData?: ExibirClienteData;
  clienteAddress?: ExibirClienteData['address'];
  isAdmRoute = false;
  clienteName = '';
  loading = true;
  state!: TenantFullModel;
  slug: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private location: Location,
    private router: Router,
    private tenantService: TenantService
  ) {
    // Inicialização do state
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);

    // Recupera o nome salvo no localStorage
    let name = localStorage.getItem('name');
    this.clienteName = name || '';

    // Subscribe to state changes
    this.tenantService.state$
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe(state => {
        if (state) {
          this.state = state;
          this.clienteName = state.name;
          this.updateClienteData(state);
        }
      });

    // Subscribe to slug changes
    this.tenantService.slug$
      .pipe(takeUntil(this.destroy$))
      .subscribe(slug => {
        this.slug = slug;
        if (slug && !this.isAdmRoute) {
          this.loadTenantData(slug);
        }
      });

    // Router subscription for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });
  }

  ngOnInit() {
    // Initial route check
    this.checkRoute(this.location.path());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTenantData(tenant: string): void {
    this.tenantService.getTenantData(tenant)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response) => {
          if (response?.data) {
            this.tenantService.updateState(response.data);
            this.updateClienteData(response.data);
          }
        },
        error: (error) => {
          console.error('Erro ao carregar dados:', error);
          this.resetData();
        }
      });
  }

  private updateClienteData(data: TenantFullModel): void {
    this.clienteData = {
      agencies: [],
      city: {
        code: 0,
        label: data.name,
        state_code: 0,
        uf: ''
      },
      city_name: data.name,
      name: data.name,
      pncp: false,
      portal_transparencia: false,
      diario_oficial: false,
      slug: data.slug,
      state_uf: '',
      year: 0,
      government_body: '',
      file_is_sent_signed: false,
      address: {
        street: data.address?.street || '',
        number: data.address?.number || '',
        complement: data.address?.complement || '',
        district: data.address?.district || '',
        zip: data.address?.zip || ''
      },
      networks: {
        youtube: data.networks?.youtube || '',
        facebook: data.networks?.facebook || '',
        instagram: data.networks?.instagram || '',
        tiktok: data.networks?.tiktok || ''
      }
    };

    this.clienteAddress = this.clienteData.address;
  }

  private checkRoute(url: string): void {
    console.log(url)
    this.isAdmRoute = url.includes('/adm/');
    if (this.isAdmRoute) {
      this.resetData();
    }
  }

  private resetData(): void {
    this.clienteData = undefined;
    this.clienteAddress = undefined;
    this.clienteName = '';
  }
}
