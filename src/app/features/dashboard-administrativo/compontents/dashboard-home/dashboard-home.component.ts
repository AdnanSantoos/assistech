import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeService } from './service/dashboard-home.service';
import { TenantService } from '../../../../shared/services/tenant.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
  public categorias: {
    nome: string;
    quantidade: number;
    link: string;
    queryParams?: { [key: string]: any };
    show: boolean | null;
  }[] = [];

  public isStaff: boolean | null = null;

  private categoryMapping!: {
    [key: string]: {
      key: string;
      link: string;
      queryParams?: { [key: string]: any };
      show: boolean | null
    };
  };

  private currentSlug: string | null = null;

  constructor(
    public tenantService: TenantService,
    private _service: DashboardHomeService
  ) {}

  ngOnInit() {
    this.isStaff = this.tenantService.getStaff();
    this.currentSlug = this.tenantService.getTenant();

    this.updateCategoryMapping();

    this.tenantService.slug$
      .pipe(
        tap((slug) => {
          this.currentSlug = slug;
          this.updateCategoryMapping(); // Update mapping when slug changes
        }),
        switchMap((tenant) => this._service.getDashboard())
      )
      .subscribe((res) => {
        const data = res.data;

        // Filter categories based on permissions
        this.categorias = Object.entries(this.categoryMapping)
          .filter(([_, { show }]) => show) // Only include items with show=true
          .map(([nome, { key, link, queryParams, show }]) => ({
            nome,
            quantidade: data[key] || 0,
            link,
            queryParams,
            show,
          }));
      });
  }

  private updateCategoryMapping(): void {
    const baseAdminPath = this.currentSlug
      ? `/${this.currentSlug}/adm`
      : '/adm';

    this.categoryMapping = {
      Arquivos: {
        key: 'files',
        link: `${baseAdminPath}/dashboard-administrativo/gerenciar-diario-oficial`,
        show: true,
      },
      Usuários: {
        key: 'users',
        link: `${baseAdminPath}/dashboard-administrativo/usuarios`,
        show: this.isStaff,
      },
      Publicações: {
        key: 'official_gazettes',
        link: `${baseAdminPath}/dashboard-administrativo/gerenciar-diario-oficial`,
        show: true,
      },
      Órgãos: {
        key: 'agencies',
        link: `${baseAdminPath}/dashboard-administrativo/orgaos`,
        show: true,
      },
      Contratos: {
        key: 'contracts',
        link: `${baseAdminPath}/dashboard-administrativo/contratos`,
        show: true,
      },
      Licitações: {
        key: 'procurements',
        link: `${baseAdminPath}/dashboard-administrativo/licitacoes`,
        show: true,
      },
      Unidades: {
        key: 'units',
        link: `${baseAdminPath}/dashboard-administrativo/unidades`,
        show: true,
      },
      'Planos de Contratação': {
        key: 'contract_plans',
        link: `${baseAdminPath}/dashboard-administrativo/pca`,
        show: true,
      },
      Termos: {
        key: 'terms',
        link: `${baseAdminPath}/dashboard-administrativo/contratos`,
        queryParams: { has_term: true },
        show: true,
      },
    };
  }

  isLastTwo(index: number): boolean {
    const { length } = this.categorias;
    return length % 2 === 0 && index >= length - 2;
  }
}
