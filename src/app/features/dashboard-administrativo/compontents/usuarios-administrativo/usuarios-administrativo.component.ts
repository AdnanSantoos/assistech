import { TenantService } from './../../../../shared/services/tenant.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from './service/usuarios-administrativos.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-usuarios-administrativo',
  standalone: true,
  imports: [
    MatPaginator,
    MatIcon,
    CommonModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  templateUrl: './usuarios-administrativo.component.html',
  styleUrls: ['./usuarios-administrativo.component.scss'],
})
export class UsuariosAdministrativoComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'nome', 'cidade', 'email', 'usuario', 'cpf',
    'telefone', 'status', 'permissao', 'pncp',
    'diarioOficial', 'portalTransparencia', 'acoes'
  ];

  dataSource = new MatTableDataSource<UsuarioData>();
  currentPage = 1;
  totalPages = 1;
  slug!: string;
  isLoading = false;

  filterForm = new FormGroup({
    tenant: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    cpf: new FormControl(''),
    phone: new FormControl(''),
    status: new FormControl('all'),
    permissions: new FormControl('all')
  });

  constructor(
    private usuariosService: UsuariosService,
    public router: Router,
    public route: ActivatedRoute,
    private _tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this.loadAllPages();
    this.slug = this._tenantService.getTenant()!;
  }

  async loadAllPages(): Promise<void> {
    this.isLoading = true;
    try {
      // Carrega a primeira página para obter o total de páginas
      const firstPage = await this.usuariosService.getUsuarios(1).toPromise();
      if (!firstPage) return;

      let allData: UsuarioData[] = [...firstPage.data];
      this.totalPages = firstPage.meta?.pagination.last_page || 1;

      // Carrega as páginas restantes
      if (this.totalPages > 1) {
        const remainingPages = Array.from(
          { length: this.totalPages - 1 },
          (_, i) => i + 2
        );

        const promises = remainingPages.map(page =>
          this.usuariosService.getUsuarios(page).toPromise()
        );

        const results = await Promise.all(promises);
        results.forEach(result => {
          if (result?.data) {
            allData = [...allData, ...result.data];
          }
        });
      }

      this.dataSource.data = allData;
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    const formValues = this.filterForm.value;
    let filteredData = [...this.dataSource.data];

    if (formValues.tenant) {
      filteredData = filteredData.filter(item =>
        item.tenant?.name?.toLowerCase().includes(formValues.tenant?.toLowerCase() || '')
      );
    }

    if (formValues.name) {
      filteredData = filteredData.filter(item =>
        item.name?.toLowerCase().includes(formValues.name?.toLowerCase() || '')
      );
    }

    if (formValues.email) {
      filteredData = filteredData.filter(item =>
        item.email?.toLowerCase().includes(formValues.email?.toLowerCase() || '')
      );
    }

    if (formValues.username) {
      filteredData = filteredData.filter(item =>
        item.username?.toLowerCase().includes(formValues.username?.toLowerCase() || '')
      );
    }

    if (formValues.cpf) {
      filteredData = filteredData.filter(item =>
        item.country_register?.includes(formValues.cpf || '')
      );
    }

    if (formValues.phone) {
      filteredData = filteredData.filter(item =>
        item.phone?.includes(formValues.phone || '')
      );
    }

    if (formValues.status && formValues.status !== 'all') {
      filteredData = filteredData.filter(item =>
        formValues.status === 'active' ? item.is_active : !item.is_active
      );
    }

    if (formValues.permissions && formValues.permissions !== 'all') {
      filteredData = filteredData.filter(item => {
        switch (formValues.permissions) {
          case 'diario':
            return item.permissions?.diario_oficial?.add;
          case 'pncp':
            return item.permissions?.pncp?.add;
          case 'transparencia':
            return item.permissions?.transparencia?.add;
          default:
            return true;
        }
      });
    }

    this.dataSource.data = filteredData;
  }

  clearFilters(): void {
    this.filterForm.reset({
      tenant: '',
      name: '',
      email: '',
      username: '',
      cpf: '',
      phone: '',
      status: 'all',
      permissions: 'all'
    });
    this.loadAllPages();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
