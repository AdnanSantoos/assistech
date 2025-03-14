import { NavigationService } from './../../services/navigation.service';
import {
  Component,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TenantService } from '../../services/tenant.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { OrgaosService } from '../../../features/dashboard-administrativo/compontents/orgao-administrativo/service/orgao-administrativos.service';
import { RequisicaoModel, TenantFullModel } from '../../models/shared.model';
import { OrgaoModel } from '../../../features/dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { EventEmitter } from 'stream';
import {
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIcon,
    ModalModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [BsModalService],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent implements OnInit {
  public isStaff: boolean | null = null;
  public menuItems: any = [];
  public originalMenuItems: any;
  public modalRef?: BsModalRef;
  orgaos: OrgaoModel[] = [];
  tenants: TenantFullModel[] = [];
  @ViewChild('confirmationTemplate', { static: true })
  confirmationTemplate!: TemplateRef<any>;
  slug!: string;
  permissions: any = {};
  searchTerm: string = '';
  filteredTenants: TenantFullModel[] = [];
  private searchSubject = new Subject<string>();
  activeFilter: boolean | null = null;

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;

  constructor(
    public tenantService: TenantService,
    private router: Router,
    private modalService: BsModalService,
    private _tenantService: TenantService,
    public route: ActivatedRoute,
    public navigationService:NavigationService
  ) {
    this._tenantService.slug$.subscribe((v) => {
      this.slug = v!;
    });
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.filterTenants();
      });
  }

  ngOnInit(): void {
    // Inicializa a lista de tenants filtrados
    this.filteredTenants = this.tenants;

    // Observa mudanças no slug do tenant
    this._tenantService.slug$.subscribe((slug) => {
      this.slug = slug!; // Atualiza o slug local com o valor do TenantService
      console.log('Slug atual:', this.slug); // Para depuração
    });

    // Verifica se o usuário é staff
    this.isStaff = this.tenantService.getStaff();

    // Define os itens do menu original
    this.originalMenuItems = [
      {
        title: 'Cadastrar',
        expanded: false,
        alwaysShow: true, // Sempre exibir, independente das permissões
        subMenu: [
          {
            title: 'Cliente',
            link: `../dashboard-administrativo/cliente`,
            visible: this.isStaff, // Visível apenas para staff
          },
          {
            title: 'Usuário',
            link: '../dashboard-administrativo/usuarios',
            visible: this.isStaff, // Visível apenas para staff
          },
          {
            title: 'Imagens',
            link: '../dashboard-administrativo/cadastrar-fotos-diario',
            visible: this.isStaff, // Visível apenas para staff
          },
        ],
      },
      {
        title: 'Diário Oficial',
        expanded: false,
        permission: 'diario_oficial', // Permissão necessária para exibir
        subMenu: [
          {
            title: 'Publicacoes',
            link: '../dashboard-administrativo/gerenciar-diario-oficial',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
        ],
      },
      {
        title: 'PNCP',
        expanded: false,
        permission: 'pncp', // Permissão necessária para exibir
        subMenu: [
          {
            title: 'Órgãos',
            link: '../dashboard-administrativo/orgaos',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
          {
            title: 'Unidades',
            link: '../dashboard-administrativo/unidades',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
          {
            title: 'Licitações',
            link: '../dashboard-administrativo/licitacoes',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
          {
            title: 'Contratos',
            link: '../dashboard-administrativo/contratos',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
          {
            title: 'PCA',
            link: '../dashboard-administrativo/pca',
            visible: true, // Submenu sempre visível se o item principal for exibido
          },
        ],
      },
      {
        title: 'Portal de Transparência',
        link: '../dashboard-administrativo/outros',
        expanded: false,
        permission: 'portal_transparencia', // Permissão necessária para exibir
        subMenu: [],
      },
    ];

    // Inicializa os itens do menu com base no original
    this.menuItems = [...this.originalMenuItems];

    // Verifica se há permissões salvas no localStorage
    const savedPermissions = localStorage.getItem('userPermissions');
    if (savedPermissions) {
      this.permissions = JSON.parse(savedPermissions); // Carrega as permissões
      this.updateMenuVisibility(); // Atualiza a visibilidade do menu com base nas permissões
    }

    // Expande o menu com base na rota atual
    this.expandMenuBasedOnRoute(this.router.url);
  }

  loadTenants(): void {
    if (this.searchTerm.trim()) {
      // Se tiver termo de busca, carrega todas as páginas
      this.loadTenantsForSearch();
    } else {
      // Se não tiver busca, carrega paginação normal
      this._tenantService.getTenantFilter(this.currentPage).subscribe({
        next: (response: RequisicaoModel<TenantFullModel[]>) => {
          this.tenants = response.data;
          this.filteredTenants = response.data;
          this.totalPages = response.meta?.pagination.last_page || 1;
          this.totalItems = response.meta?.pagination.total || 0;
        },
        error: (err) => console.error('Erro ao carregar tenants:', err),
      });
    }
  }

  loadTenantsForSearch(): void {
    // First call to get total pages
    this._tenantService.getTenantFilter(1).subscribe({
      next: (response: RequisicaoModel<TenantFullModel[]>) => {
        const totalPages = response.meta?.pagination.last_page || 1;
        const requests = [];

        // Create requests for all pages
        for (let page = 1; page <= totalPages; page++) {
          requests.push(this._tenantService.getTenantFilter(page));
        }

        // Execute all requests in parallel
        forkJoin(requests).subscribe({
          next: (responses) => {
            // Combine all results into a single array
            this.tenants = responses.reduce((acc, response) => {
              return [...acc, ...response.data];
            }, [] as TenantFullModel[]);

            // Apply filters
            const search = this.searchTerm.toLowerCase().trim();
            this.filteredTenants = this.tenants.filter((tenant) => {
              const matchesSearch =
                !search || tenant.name.toLowerCase().includes(search);
              const matchesActiveFilter =
                this.activeFilter === null ||
                tenant.is_active === this.activeFilter;
              return matchesSearch && matchesActiveFilter;
            });

            // Update pagination
            this.totalItems = this.filteredTenants.length;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.currentPage = 1;
          },
          error: (err) =>
            console.error('Erro ao carregar todas as páginas:', err),
        });
      },
      error: (err) =>
        console.error('Erro ao carregar informações de paginação:', err),
    });
  }

  loadAllPages(): void {
    const requests: Observable<RequisicaoModel<TenantFullModel[]>>[] = [];

    // Gera um array de requisições para todas as páginas
    for (let page = 1; page <= this.totalPages; page++) {
      requests.push(this._tenantService.getTenantFilter(page));
    }

    // Faz todas as requisições em paralelo
    forkJoin(requests).subscribe({
      next: (responses) => {
        // Combina os resultados de todas as páginas
        this.tenants = responses.reduce((acc, response) => {
          return [...acc, ...response.data];
        }, [] as TenantFullModel[]);

        // Aplica o filtro nos resultados combinados
        this.filterTenants();
      },
      error: (err) => console.error('Erro ao carregar todas as páginas:', err),
    });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  filterTenants(): void {
    if (!this.searchTerm.trim() && this.activeFilter === null) {
      this.loadTenants();
      return;
    }
    this.loadTenantsForSearch();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTenants(); // Carrega a nova página do backend
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTenants();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTenants();
    }
  }

  get pagedTenants(): TenantFullModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTenants.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }

  openModal(): void {
    this.loadTenants();
    this.modalRef = this.modalService.show(this.confirmationTemplate, {
      class: 'modal-lg',
    });
  }

  selectTenant(tenantSlug: string): void {
    // Limpar o slug antigo e as permissões
    localStorage.removeItem('slug');
    localStorage.removeItem('userPermissions');

    this._tenantService
      .getTenantData(tenantSlug)
      .pipe(
        tap((v) => console.log('getTenantData response:', v)),
        switchMap((tenantDataResponse) => {
          // Definir o novo slug
          this._tenantService.setSlug(tenantDataResponse.data.slug);
          this._tenantService.updateState(tenantDataResponse.data);
          this.navigationService.initialize(tenantDataResponse.data.slug);

          // Encadeia a chamada para getDados
          return this._tenantService.getDados(tenantSlug).pipe(
            tap((dadosResponse) => {
              // Armazena informações do usuário se for staff
              if (dadosResponse.data.is_staff) {
                localStorage.setItem('userEmail', dadosResponse.data.email);
                localStorage.setItem(
                  'isStaff',
                  dadosResponse.data.is_staff.toString()
                );
              }
              if (dadosResponse.meta?.tenant?.permissions) {
                this.permissions = dadosResponse.meta?.tenant?.permissions;
                localStorage.setItem(
                  'userPermissions',
                  JSON.stringify(this.permissions)
                );
                this.updateMenuVisibility(); // Atualiza a visibilidade do menu
              }
            }),
            // Retorna ambas as respostas para usar na navegação
            map((dadosResponse) => ({
              tenantData: tenantDataResponse,
              dadosResponse,
            }))
          );
        })
      )
      .subscribe(({ tenantData }) => {
        // Corrigindo o caminho de navegação para usar apenas o novo slug
        const navigationPath = `/${tenantData.data.slug}/adm/dashboard-administrativo/home`;

        console.log('Navigating to:', navigationPath);

        // Navega para a nova URL
        this.router.navigateByUrl(navigationPath, { replaceUrl: true });

        // Fecha o modal
        this.modalRef?.hide();
      });
  }

  private expandMenuBasedOnRoute(route: string) {
    // Reset todos os menus
    this.menuItems.forEach((item: any) => (item.expanded = false));

    // Palavras-chave do PNCP
    const pncpRoutes = [
      'orgaos',
      'unidades',
      'licitacoes',
      'contratos',
      'pca',
      'licitacao',
      'cadastrar-licitacao',
    ];

    // Palavras-chave do Cadastrar
    const cadastrarRoutes = ['cliente', 'usuarios', 'cadastrar-fotos-diario'];

    if (pncpRoutes.some((keyword) => route.includes(keyword))) {
      const pncpMenu = this.menuItems.find(
        (item: any) => item.title === 'PNCP'
      );
      if (pncpMenu) pncpMenu.expanded = true;
    } else if (route.includes('diario-oficial')) {
      const diarioMenu = this.menuItems.find(
        (item: any) => item.title === 'Diário Oficial'
      );
      if (diarioMenu) diarioMenu.expanded = true;
    } else if (cadastrarRoutes.some((keyword) => route.includes(keyword))) {
      const cadastrarMenu = this.menuItems.find(
        (item: any) => item.title === 'Cadastrar'
      );
      if (cadastrarMenu) cadastrarMenu.expanded = true;
    }
  }

  updateMenuVisibility() {
    // Verifica se as permissões e os itens do menu estão definidos
    if (this.menuItems && this.permissions) {
      // Filtra os itens do menu com base nas permissões
      this.menuItems = this.originalMenuItems.filter((item: any) => {
        // Se o item não tiver uma permissão específica, ele será sempre exibido
        if (!item.permission) return true;

        // Verifica se a permissão existe e é true
        return this.permissions[item.permission] === true;
      });

      // Filtra os submenus de cada item
      this.menuItems.forEach((item: any) => {
        if (item.subMenu) {
          item.subMenu = item.subMenu.filter((subItem: any) => {
            // Se o subitem não tiver uma permissão específica, ele será sempre exibido
            if (!subItem.permission) return true;

            // Verifica se a permissão existe e é true
            return this.permissions[subItem.permission] === true;
          });
        }
      });
    }
  }

  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
