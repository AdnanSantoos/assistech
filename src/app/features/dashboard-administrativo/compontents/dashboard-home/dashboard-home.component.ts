import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeService } from './service/dashboard-home.service';
import { TenantService } from '../../../../shared/services/tenant.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public categorias: { nome: string; quantidade: number; link: string,show: boolean | null }[] = [];
  public isStaff:boolean | null= null;
  private categoryMapping!: { [key: string]: { key: string; link: string,show: boolean | null, } };

  constructor(public tenantService:TenantService,private _service: DashboardHomeService){
  
  }

  ngOnInit() {
    this.isStaff = this.tenantService.getStaff();
      this.categoryMapping = {
        'Documentos': { key: 'files', link: '/documentos',show:true },
        'Usuários': { key: 'users', link: '/adm/dashboard-administrativo/usuarios',show:this.isStaff },
        'Publicações': { key: 'official_gazettes', link: '/adm/dashboard-administrativo/gerenciar-diario-oficial',show:true },
        'Órgãos': { key: 'agencies', link: '/adm/dashboard-administrativo/orgaos',show:true },
        'Contratos': { key: 'contracts', link: '/adm/dashboard-administrativo/contratos',show:true },
        'Licitações': { key: 'procurements', link: '/adm/dashboard-administrativo/licitacoes',show:true },
        'Unidades': { key: 'units', link: '/adm/dashboard-administrativo/unidades',show:true },
        'Planos de Contratação': { key: 'contract_plans', link: '/planos-contratacao',show:true },
        'Termos': { key: 'terms', link: '/termos',show:true }
      };
    this._service.getDashboard().subscribe(res => {
      const data = res.data;
      this.categorias = Object.entries(this.categoryMapping).map(([nome, { key, link,show }]) => ({
        nome,
        quantidade: data[key] || 0,
        link,
        show
      }));
    });
  }

  isLastTwo(index: number): boolean {
    const { length } = this.categorias;
    return length % 2 === 0 && index >= length - 2;
  }
}
