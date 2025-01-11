import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UnidadeModel } from './model/unidades-administrativo.model';
import { UnidadesService } from './service/unidades-administrativos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-unidades-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule],
  templateUrl: './unidades-administrativo.component.html',
  providers: [BsModalService],
  styleUrls: ['./unidades-administrativo.component.scss'],
})
export class UnidadesAdministrativoComponent implements OnInit {
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;

  displayedColumns: string[] = [
    'numSeq',
    'nome',
    'cnpj',
    'cdgIBGE',
    'cdgUND',
    'acoes',
  ];
  dataSource = new MatTableDataSource<UnidadeModel>([]);
  pageSize = 10;
  currentPage = 1;
  totalRecords = 0;
  totalPages = 0;
  selectedUnidade: UnidadeModel | null = null;
  modalRef?: BsModalRef;

  constructor(
    private location: Location,
    private unidadesService: UnidadesService,
    private modalService: BsModalService,
    public route: ActivatedRoute
  ) {}

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

  openDeleteModal(unidade: UnidadeModel): void {
    this.selectedUnidade = unidade;
    this.modalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-dialog-centered',
    });
  }

  confirmDelete(): void {
    if (this.selectedUnidade) {
      const unidadeId = this.selectedUnidade.id;

      this.unidadesService.deleteUnidade(unidadeId).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter(
            (u) => u.id !== unidadeId
          );
          this.modalRef?.hide();
        },
        (error) => {
          console.error('Erro ao excluir unidade:', error);
        }
      );
    }
  }
}
