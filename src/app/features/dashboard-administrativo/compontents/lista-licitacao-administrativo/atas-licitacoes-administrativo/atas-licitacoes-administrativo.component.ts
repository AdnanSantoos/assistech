import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-atas-licitacoes-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './atas-licitacoes-administrativo.component.html',
  styleUrls: ['./atas-licitacoes-administrativo.component.scss'],
})
export class AtasLicitacoesAdministrativoComponent implements OnInit {
  licitacaoId!: string; // Capturado da URL
  licitacao: { number: string; year: number; process_number: string } | null = null; // Armazena os dados da licitação
  atas: any[] = []; // Armazena as atas de registro
  isLoading = true;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private licitacoesService: LicitacoesService
  ) { }

  ngOnInit() {
    // Captura o ID da licitação a partir da rota
    this.licitacaoId = this.route.snapshot.params['id'];

    if (this.licitacaoId) {
      this.loadLicitacaoDetalhes();
      this.loadAtas(this.currentPage);
    } else {
      console.error('ID da licitação não fornecido na rota.');
    }
  }

  loadLicitacaoDetalhes(): void {
    this.licitacoesService.getLicitacaoById(this.licitacaoId).subscribe({
      next: (response: any) => {
        this.licitacao = {
          number: response.data.number,
          year: response.data.year,
          process_number: response.data.process_number,
        };
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da licitação:', err);
      },
    });
  }

  loadAtas(page: number): void {
    this.isLoading = true;
    this.licitacoesService.getLicitacaoAtas(this.licitacaoId, page).subscribe({
      next: (response: RequisicaoModel<any>) => {
        this.atas = response.data;
        this.totalPages = response.meta?.pagination?.last_page || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar as atas:', err);
        this.isLoading = false;
      },
    });
  }
  deleteAta(){

  }
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAtas(page);
    }
  }
  goBack(): void {
    this._location.back();
  }

  goToPreviousPage() {
   
  }

  goToNextPage() {
    
  }
}
