import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeService } from './service/dashboard-home.service';
import { DashboardCategorias } from './models/dashboard-home.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public categorias: { nome: string; quantidade: number; link: string }[] = [];

  private categoryMapping: { [key: string]: { key: string; link: string } } = {
    'Documentos': { key: 'files', link: '/documentos' },
    'Usuários': { key: 'users', link: '/adm/dashboard-administrativo/usuarios' },
    'Publicações': { key: 'official_gazettes', link: '/adm/dashboard-administrativo/gerenciar-diario-oficial' },
    'Órgãos': { key: 'agencies', link: '/adm/dashboard-administrativo/orgaos' },
    'Contratos': { key: 'contracts', link: '/adm/dashboard-administrativo/contratos' },
    'Licitações': { key: 'procurements', link: '/adm/dashboard-administrativo/licitacoes' },
    'Unidades': { key: 'units', link: '/adm/dashboard-administrativo/unidades' },
    'Planos de Contratação': { key: 'contract_plans', link: '/planos-contratacao' },
    'Termos': { key: 'terms', link: '/termos' }
  };

  constructor(private _service: DashboardHomeService) {}

  ngOnInit() {
    this._service.getDashboard().subscribe(res => {
      const data = res.data;
      this.categorias = Object.entries(this.categoryMapping).map(([nome, { key, link }]) => ({
        nome,
        quantidade: data[key] || 0,
        link
      }));
    });
  }

  isLastTwo(index: number): boolean {
    const { length } = this.categorias;
    return length % 2 === 0 && index >= length - 2;
  }
}
