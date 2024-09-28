import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  categorias = [
    { nome: 'Documentos', quantidade: 450 },
    { nome: 'Usuários', quantidade: 1230 },
    { nome: 'Publicações', quantidade: 4230 },
    { nome: 'Órgãos', quantidade: 20 },
    { nome: 'Contratos', quantidade: 75 },
    { nome: 'Licitações', quantidade: 5 },
    { nome: 'Unidades', quantidade: 12 },
    { nome: 'Planos de Contratação', quantidade: 15 },
    { nome: 'Termos', quantidade: 8 },

  ];
  isLastTwo(index: number): boolean {
    const total = this.categorias.length;
    const isEven = total % 2 === 0;
    return isEven && (index === total - 1 || index === total - 2);
  }
}
