import { TenantService } from './../../../../shared/services/tenant.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from './service/usuarios-administrativos.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-usuarios-administrativo',
  standalone: true,
  imports: [MatPaginator, MatIcon, CommonModule, RouterModule, MatTooltipModule],
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
  slug!:string;

  constructor(private usuariosService: UsuariosService, public router: Router, public route: ActivatedRoute, private _tenantService:TenantService) { 
  }

  ngOnInit(): void {
    this.loadUsuarios(this.currentPage);
    this.slug = this._tenantService.getTenant()!;
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