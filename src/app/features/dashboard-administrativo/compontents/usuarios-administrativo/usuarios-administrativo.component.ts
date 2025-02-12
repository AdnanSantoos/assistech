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
    NgSelectModule
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

  originalData: UsuarioData[] = [];
  dataSource = new MatTableDataSource<UsuarioData>();
  currentPage = 1;
  totalPages = 1;
  slug!: string;

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
    this.loadUsuarios(this.currentPage);
    this.slug = this._tenantService.getTenant()!;

    // Observar mudanças no formulário
    this.filterForm.valueChanges.subscribe(() => {
      this.filterData();
    });
  }

  loadUsuarios(page: number): void {
    this.usuariosService.getUsuarios(page).subscribe({
      next: (res) => {
        this.originalData = res.data; // Guardar dados originais
        this.dataSource.data = res.data;
        this.currentPage = res.meta?.pagination.current_page || 1;
        this.totalPages = res.meta?.pagination.last_page || 1;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  filterData(): void {
    const formValues = this.filterForm.value;

    let filteredData = this.originalData;

    // Filtrar por tenant (cliente)
    if (formValues.tenant) {
      filteredData = filteredData.filter(item =>
        item.tenant?.name?.toLowerCase().includes(formValues.tenant?.toLowerCase() || '')
      );
    }

    // Filtrar por nome
    if (formValues.name) {
      filteredData = filteredData.filter(item =>
        item.name?.toLowerCase().includes(formValues.name?.toLowerCase() || '')
      );
    }

    // Filtrar por email
    if (formValues.email) {
      filteredData = filteredData.filter(item =>
        item.email?.toLowerCase().includes(formValues.email?.toLowerCase() || '')
      );
    }

    // Filtrar por username
    if (formValues.username) {
      filteredData = filteredData.filter(item =>
        item.username?.toLowerCase().includes(formValues.username?.toLowerCase() || '')
      );
    }

    // Filtrar por CPF
    if (formValues.cpf) {
      filteredData = filteredData.filter(item =>
        item.country_register?.includes(formValues.cpf || '')
      );
    }

    // Filtrar por telefone
    if (formValues.phone) {
      filteredData = filteredData.filter(item =>
        item.phone?.includes(formValues.phone || '')
      );
    }

    // Filtrar por status
    if (formValues.status && formValues.status !== 'all') {
      filteredData = filteredData.filter(item =>
        formValues.status === 'active' ? item.is_active : !item.is_active
      );
    }

    // Filtrar por permissões
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

    // Atualizar o dataSource com os dados filtrados
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
    this.dataSource.data = this.originalData;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsuarios(page);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadUsuarios(--this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadUsuarios(++this.currentPage);
    }
  }
}
