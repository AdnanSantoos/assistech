import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UnidadeModel } from './model/unidades-administrativo.model';
import { UnidadesService } from './service/unidades-administrativos.service';

@Component({
  selector: 'app-unidades-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './unidades-administrativo.component.html',
  styleUrls: ['./unidades-administrativo.component.scss'],
})
export class UnidadesAdministrativoComponent implements OnInit {
  displayedColumns: string[] = ['numSeq', 'nome', 'cnpj', 'cdgIBGE', 'cdgUND', 'acoes'];
  dataSource = new MatTableDataSource<UnidadeModel>([]);
  pageSize = 10;
  currentPage = 1;
  totalRecords = 0;
  totalPages = 0;

  constructor(private location: Location, private unidadesService: UnidadesService) {}

  ngOnInit() {
    this.loadUnidades(this.currentPage);
  }

  goBack(): void {
    this.location.back();
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadUnidades(pageNumber);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUnidades(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUnidades(this.currentPage);
    }
  }

  loadUnidades(page: number) {
    this.unidadesService.getUnidade(page).subscribe({
      next: (response) => {
        this.dataSource.data = response.data.map((unidade, index) => ({
          ...unidade,
          numSeq: ((page - 1) * this.pageSize + index + 1).toString(),
        }));
        this.totalRecords = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      },
      error: (err) => {
        console.error('Erro ao carregar unidades:', err);
      },
    });
  }
}