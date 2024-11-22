import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from './service/usuarios-administrativos.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios-administrativo',
  standalone: true,
  imports: [MatPaginator, MatIcon, CommonModule, RouterModule],
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

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.loadUsuarios(this.currentPage);
  }

  loadUsuarios(page: number): void {
    this.usuariosService.getUsuarios(page).subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.currentPage = res.meta?.pagination.current_page || 1;
        this.totalPages = res.meta?.pagination.last_page || 1;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
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