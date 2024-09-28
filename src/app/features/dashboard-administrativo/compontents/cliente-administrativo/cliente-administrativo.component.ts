import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { ClienteData } from '../../model/cliente.model';
import { RouterModule } from '@angular/router';



const CLIENTE_DATA: ClienteData[] = [
  { nome: 'Cliente 1', cidade: 'Cidade A', pncp: 'Sim', portalTransparencia: 'Ativo', diarioOficial: 'Ativo', anoInicial: '2021', proximaEdicao: '2024', dominio: 'cliente1.com', tipo: 'Prefeitura', status: 'Ativo' },
  { nome: 'Cliente 2', cidade: 'Cidade B', pncp: 'Não', portalTransparencia: 'Inativo', diarioOficial: 'Inativo', anoInicial: '2019', proximaEdicao: '2023', dominio: 'cliente2.com', tipo: 'Câmara', status: 'Inativo' },
];

@Component({
  selector: 'app-cliente-administrativo',
  templateUrl: './cliente-administrativo.component.html',
  imports: [CommonModule, MatIconModule, MatPaginator, MatTableModule, RouterModule],
  standalone: true,
  styleUrls: ['./cliente-administrativo.component.scss']
})
export class ClienteAdministrativoComponent implements OnInit {
  displayedColumns: string[] =
    ['nome', 'cidade', 'pncp', 'portalTransparencia', 'diarioOficial',
      'anoInicial', 'proximaEdicao', 'dominio', 'tipo', 'status', 'acoes'];
  dataSource = new MatTableDataSource<ClienteData>(CLIENTE_DATA);
  pageSize = 10;
  currentPage = 1;
  totalPages = Math.ceil(this.dataSource.data.length / this.pageSize);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator; // Conectando o paginador aos dados da tabela
  }
  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateTableData();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateTableData();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateTableData();
    }
  }

  updateTableData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = this.currentPage * this.pageSize;
    this.dataSource.data = CLIENTE_DATA.slice(startIndex, endIndex);
  }
}