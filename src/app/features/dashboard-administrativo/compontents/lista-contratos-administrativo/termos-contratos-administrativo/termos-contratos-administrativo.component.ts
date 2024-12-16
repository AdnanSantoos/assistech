import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { MatIcon } from '@angular/material/icon';
import { LicitacoesService } from '../../lista-licitacao-administrativo/service/licitacoes-administrativos.service';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';


@Component({
  selector: 'app-termos-contratos-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterModule],
  templateUrl: './termos-contratos-administrativo.component.html',
  styleUrls: ['./termos-contratos-administrativo.component.scss'],
})
export class TermosContratosAdministrativoComponent implements OnInit {
  contratoId!: string; // ID do contrato capturado da URL
  termos: any[] = []; // Armazena os termos carregados
  isLoading = true; // Flag de carregamento
  currentPage = 1; // Página atual
  totalPages = 1; // Total de páginas
  totalItems = 0; // Total de itens

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private contratosService: ContratosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.contratoId = params.get('id') || '';
      if (this.contratoId) {
        this.loadTerms(this.currentPage);
      } else {
        console.error('ID do contrato não fornecido na rota.');
      }
    });
  }

  loadTerms(page: number): void {
    this.isLoading = true;
    this.contratosService.getContractTerms(this.contratoId, page).subscribe({
      next: (response) => {
        this.termos = response.data || [];
        this.totalPages = response.meta?.pagination?.last_page || 1;
        this.currentPage = response.meta?.pagination?.current_page || page;
        this.totalItems = response.meta?.pagination?.total || 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os termos:', err);
        this.isLoading = false;
      },
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadTerms(page);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  goBack(): void {
    this.location.back();
  }

  deleteTerm(termId: string): void {
    console.log(`Excluir termo com ID: ${termId}`);
  }
}