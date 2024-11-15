import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardHomeService } from './service/dashboard-home.service';
import { DashboardCategorias } from './models/dashboard-home.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  public categorias: DashboardCategorias[] = [];

  private categoryMapping:any = {
    'Documentos': 'files',
    'Usuários': 'users',
    'Publicações': 'official_gazettes',
    'Órgãos': 'agencies',
    'Contratos': 'contracts',
    'Licitações': 'procurements',
    'Unidades': 'units',
    'Planos de Contratação': 'contract_plans',
    'Termos': 'terms'
  };

  constructor(private _service: DashboardHomeService) {}

  ngOnInit() {
    this._service.getDashboard().subscribe(res => {
      const data = res.data;
      this.categorias = Object.keys(this.categoryMapping).map(nome => ({
        nome,
        quantidade: data[this.categoryMapping[nome]] || 0
      }));
    });
  }

  isLastTwo(index: number): boolean {
    const { length } = this.categorias;
    return length % 2 === 0 && index >= length - 2;
  }
}
