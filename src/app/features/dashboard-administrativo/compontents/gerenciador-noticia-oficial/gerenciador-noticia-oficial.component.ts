import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NoticiaService } from '../cadastrar-noticias/services/cadastrar-noticias.service';
import { Noticia } from '../cadastrar-noticias/models/cadastrar-noticias.model';

@Component({
  selector: 'app-gerenciador-noticia-oficial',
  templateUrl: './gerenciador-noticia-oficial.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, TooltipModule],
  styleUrls: ['./gerenciador-noticia-oficial.component.scss']
})
export class GerenciadorNoticiaOficialComponent implements OnInit {
  public noticias: Noticia[] = [];
  public currentPage = 1;
  public totalPages = 1;
  public totalResults = 0;

  constructor(
    private _location: Location,
    private _noticiaService: NoticiaService
  ) {}

  ngOnInit(): void {
    this.loadNoticias(this.currentPage);
  }

  goBack(): void {
    this._location.back();
  }

  loadNoticias(page: number): void {
    this._noticiaService.getNoticias().subscribe({
      next: (response: any) => {
        this.noticias = response.data;
        this.currentPage = response.meta.pagination.current_page;
        this.totalPages = response.meta.pagination.last_page;
        this.totalResults = response.meta.pagination.total;
      },
      error: (err) => {
        console.error('Erro ao carregar as notícias:', err);
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadNoticias(page);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadNoticias(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadNoticias(this.currentPage + 1);
    }
  }
}
