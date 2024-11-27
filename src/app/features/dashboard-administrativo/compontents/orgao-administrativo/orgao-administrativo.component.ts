import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { OrgaoModel } from './model/orgao-administrativo.model';
import { OrgaosService } from './service/orgao-administrativos.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';


@Component({
  selector: 'app-orgao-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './orgao-administrativo.component.html',
  styleUrls: ['./orgao-administrativo.component.scss'],
})
export class OrgaoAdministrativoComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'cnpj',
    'acoes',
  ];
  dataSource = new MatTableDataSource<OrgaoModel>([]);
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;

  constructor(
    private location: Location,
    private _orgaosService: OrgaosService
  ) {}

  ngOnInit() {
    this.loadOrgaos(this.currentPage);
  }

  goBack(): void {
    this.location.back();
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadOrgaos(this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrgaos(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadOrgaos(this.currentPage);
    }
  }

  loadOrgaos(page: number) {
    this._orgaosService.getOrgaos(page).subscribe({
      next: (response: RequisicaoModel<OrgaoModel[]>) => {
        this.dataSource.data = response.data.map((orgao, index) => ({
          ...orgao,
          numSeq: ((page - 1) * this.pageSize + index + 1).toString(),
        }));
        this.totalRecords = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
      },
      error: (err) => {
        console.error('Erro ao carregar órgãos:', err);
      },
    });
  }
}
