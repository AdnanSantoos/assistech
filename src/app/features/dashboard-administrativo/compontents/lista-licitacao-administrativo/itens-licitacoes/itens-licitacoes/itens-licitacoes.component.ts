import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { LicitacaoDetalhesModel } from '../../model/licitacoes-administrativo.model';
import { RequisicaoModel, PaginationModel } from '../../../../../../shared/models/shared.model';

@Component({
  selector: 'app-itens-licitacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './itens-licitacoes.component.html',
  styleUrls: ['./itens-licitacoes.component.scss'],
})
export class ItensLicitacoesComponent implements OnInit {
  licitacao = {
    numeroLicitacao: '',
    numeroCompra: '',
    year:'',
    itens: [] as LicitacaoDetalhesModel[],
  };

  pagination: PaginationModel | null = null;
  isLoadingDetails = true;
  isLoadingItens = true;

  constructor(
    private licitacoesService: LicitacoesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const licitacaoId = params['id']; // Fetch ID from route
      if (licitacaoId) {
        this.loadLicitacaoDetails(licitacaoId);
        this.loadLicitacaoItens(licitacaoId, 1);
      } else {
        console.error('Licitacao ID not provided in route parameters.');
      }
    });
  }

  loadLicitacaoDetails(licitacaoId: string): void {
    this.isLoadingDetails = true;
    this.licitacoesService.getLicitacaoById(licitacaoId).subscribe({
      next: (response: RequisicaoModel<LicitacaoDetalhesModel>) => {
        const details = response.data;
        this.licitacao.numeroLicitacao = details.number;
        this.licitacao.numeroCompra = details.process_number;
        this.isLoadingDetails = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da licitação:', err);
        this.isLoadingDetails = false;
      },
    });
  }

  loadLicitacaoItens(licitacaoId: string, page: number): void {
    this.isLoadingItens = true;
    this.licitacoesService.getLicitacoesItens(licitacaoId, page).subscribe({
      next: (response: RequisicaoModel<LicitacaoDetalhesModel[]>) => {
        this.licitacao.itens = response.data.map((item) => ({
          id: item.id,
          created_by_id: item.created_by_id,
          call_instrument_id: item.call_instrument_id,
          contracting_modality_id: item.contracting_modality_id,
          contracting_situation_id: item.contracting_situation_id,
          dispute_mode_id: item.dispute_mode_id,
          legal_basic_id: item.legal_basic_id,
          number: item.number,
          year: item.year,
          process_number: item.process_number,
          goals: item.goals,
          srp: item.srp,
          additional_information: item.additional_information,
          opening_date_proposal: item.opening_date_proposal,
          closing_date_proposal: item.closing_date_proposal,
          agency: item.agency,
          unit: item.unit,
          applicability_normal_preference_margin: item.applicability_normal_preference_margin,
          applicability_additional_preference_margin: item.applicability_additional_preference_margin,
          normal_preference_margin: item.normal_preference_margin,
          additional_preference_margin: item.additional_preference_margin,
          normal_preference_margin_percentage: item.normal_preference_margin_percentage,
          additional_preference_margin_percentage: item.additional_preference_margin_percentage,
          ncm_nbs_code: item.ncm_nbs_code,
          ncm_nbs_description: item.ncm_nbs_description,
        }));
        this.pagination = response.meta?.pagination || null;
        this.isLoadingItens = false;
      },
      error: (err) => {
        console.error('Erro ao carregar itens da licitação:', err);
        this.isLoadingItens = false;
      },
    });
  }

  nextPage(): void {
    if (this.pagination && this.pagination.current_page < this.pagination.last_page) {
      this.loadLicitacaoItens(this.route.snapshot.params['id'], this.pagination.current_page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination && this.pagination.current_page > 1) {
      this.loadLicitacaoItens(this.route.snapshot.params['id'], this.pagination.current_page - 1);
    }
  }
}
