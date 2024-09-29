import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { UsuarioData } from '../../model/usuarios.model';

const USUARIO_DATA: UsuarioData[] = [
  { id: 1, nome: 'Cliente 1', cidade: 'Cidade A', email: 'cliente1@email.com', usuario: 'cliente1', cpf: '123.456.789-00', telefone: '(11) 91234-5678', status: 'Ativo', permissao: 'Admin', pncp: 'Sim', diarioOficial: 'Ativo', portalTransparencia: 'Ativo', anoInicial: '2021', proximaEdicao: '2024', dominio: 'cliente1.com', tipo: 'Prefeitura' },
  { id: 2, nome: 'Cliente 2', cidade: 'Cidade B', email: 'cliente2@email.com', usuario: 'cliente2', cpf: '987.654.321-00', telefone: '(21) 98765-4321', status: 'Inativo', permissao: 'Usuário', pncp: 'Não', diarioOficial: 'Inativo', portalTransparencia: 'Inativo', anoInicial: '2019', proximaEdicao: '2023', dominio: 'cliente2.com', tipo: 'Câmara' }
];

@Component({
  selector: 'app-usuarios-administrativo',
  imports: [CommonModule, MatIconModule, MatPaginator, MatTableModule, RouterModule],
  standalone: true,
  templateUrl: './usuarios-administrativo.component.html',
  styleUrls: ['./usuarios-administrativo.component.scss']
})
export class UsuariosAdministrativoComponent implements OnInit {
  displayedColumns: string[] =
    ['id', 'nome', 'cidade', 'email', 'usuario', 'cpf', 'telefone', 'status', 'permissao', 'pncp', 'diarioOficial', 'portalTransparencia', 'acoes'];
  dataSource = new MatTableDataSource<UsuarioData>(USUARIO_DATA);
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
    this.dataSource.data = USUARIO_DATA.slice(startIndex, endIndex);
  }
}
