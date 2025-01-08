import {
  Component,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TenantService } from '../../services/tenant.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { OrgaosService } from '../../../features/dashboard-administrativo/compontents/orgao-administrativo/service/orgao-administrativos.service';
import { RequisicaoModel, TenantFullModel } from '../../models/shared.model';
import { OrgaoModel } from '../../../features/dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { EventEmitter } from 'stream';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-sidebar-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, ModalModule],
  providers: [BsModalService],
  templateUrl: './sidebar-administrativo.component.html',
  styleUrls: ['./sidebar-administrativo.component.scss'],
})
export class SidebarAdministrativoComponent implements OnInit {
  public isStaff: boolean | null = null;
  public menuItems: any;
  public modalRef?: BsModalRef;
  orgaos: OrgaoModel[] = [];
  tenants: TenantFullModel[] = [];
  @ViewChild('confirmationTemplate', { static: true })
  confirmationTemplate!: TemplateRef<any>;
  slug!:string;

  constructor(
    public tenantService: TenantService,
    private router: Router,
    private modalService: BsModalService,
    private _tenantService: TenantService,
    private _orgaoService: OrgaosService
  ) {
    this._tenantService.slug$.subscribe(v=>{
      this.slug = v!;
    })
  }

  ngOnInit(): void {
    this.isStaff = this.tenantService.getStaff();
    this.menuItems = [
      {
        title: 'Cadastrar',
        expanded: false,
        subMenu: [
          {
            title: 'Cliente',
            link: `../dashboard-administrativo/cliente`,
            visible: this.isStaff,
          },
          {
            title: 'Usuário',
            link: '../dashboard-administrativo/usuarios',
            visible: this.isStaff,
          },
          {
            title: 'Imagens',
            link:'../dashboard-administrativo/cadastrar-fotos-diario',
            visible: true,
          },
        ],
      },
      {
        title: 'Diário Oficial',
        expanded: false,
        subMenu: [
          {
            title: 'Publicacoes',
            link:'../dashboard-administrativo/gerenciar-diario-oficial',
            visible: true,
          },
        ],
      },
      {
        title: 'PNCP',
        expanded: false,
        subMenu: [
          {
            title: 'Órgãos',
            link: '../dashboard-administrativo/orgaos',
            visible: true,
          },
          {
            title: 'Unidades',
            link: '../dashboard-administrativo/unidades',
            visible: true,
          },
          {
            title: 'Licitações',
            link: '../dashboard-administrativo/licitacoes',
            visible: true,
          },
          {
            title: 'Contratos',
            link: '../dashboard-administrativo/contratos',
            visible: true,
          },
          {
            title: 'PCA',
            link: '../dashboard-administrativo/pca',
            visible: true,
          },
        ],
      },
      {
        title: 'Portal de Transparência',
        link: '../dashboard-administrativo/outros',
        expanded: false,
        subMenu: [],
      },
    ];

    this.expandMenuBasedOnRoute(this.router.url);
  }
  loadTenants(): void {
    this.tenantService.getTenantFull().subscribe({
      next: (response: RequisicaoModel<TenantFullModel[]>) => {
        this.tenants = response.data;
      },
      error: (err) => {
        console.error('Erro ao carregar tenants:', err);
      },
    });
  }

  openModal(): void {
    this.loadTenants();
    this.modalRef = this.modalService.show(this.confirmationTemplate, {
      class: 'modal-lg',
    });
  }

  selectTenant(tenantSlug: string): void {
    this._tenantService.getTenantData(tenantSlug)
      .pipe(
        tap(v => console.log('getTenantData response:', v)), // para debug
        // Garante que a navegação só acontece após o slug ser atualizado
        switchMap(v => {
          this._tenantService.setSlug(v.data.slug);
          return of(v); // Continua o fluxo com o valor original
        })
      )
      .subscribe(v => {
        this.router.navigate([`${v.data.slug}/adm/dashboard-administrativo/home`]);
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
      'cadastrar-licitacao'
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

  toggleSubMenu(item: any) {
    if (!item.link) {
      item.expanded = !item.expanded;
    }
  }
}
