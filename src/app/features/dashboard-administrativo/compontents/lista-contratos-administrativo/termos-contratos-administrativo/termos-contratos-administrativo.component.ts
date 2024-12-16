import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { ContratoModel, TermosContratosModel } from '../../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-termos-contratos-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterModule],
  templateUrl: './termos-contratos-administrativo.component.html',
  styleUrls: ['./termos-contratos-administrativo.component.scss'],
})
export class TermosContratosAdministrativoComponent implements OnInit {
  contratoId!: string; // ID do contrato capturado da URL
  termos: TermosContratosModel[] = []; // Lista de termos carregados
  termosTotal: ContratoModel[] = []
  combinedTerms: any[] = [];

  isLoading = true; // Controle de carregamento
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

  // loadTerms(page: number): void {
  //   this.isLoading = true;
  //   this.contratosService.getContractTerms(this.contratoId, page).subscribe({
  //     next: (response) => {
  //       this.termos = response.data.map((item: any) => ({
  //         id: item.id,
  //         number: item.number,
  //         gateway_sequence: item.gateway_sequence,
  //         created_at_show: item.created_at_show,
  //         created_at: item.created_at,
  //       }));
  //       this.totalPages = response.meta?.pagination?.last_page || 1;
  //       this.currentPage = response.meta?.pagination?.current_page || page;
  //       this.totalItems = response.meta?.pagination?.total || 0;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao carregar os termos:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }

  loadTerms(page: number): void {
    this.isLoading = true;
    this.contratosService.getContractTerms(this.contratoId, page).subscribe({
      next: (response) => {
        this.termos = response.data.map((item: any) => ({
          id: item.id,
          number: item.number,
          goals: item.goals,
          signature_date: item.signature_date,
          added_value: item.added_value,
          number_of_installments: item.number_of_installments,
          installment_value: item.installment_value,
          total_value: item.total_value,
          added_term_days: item.added_term_days,
          validity_start_date: item.validity_start_date,
          validity_end_date: item.validity_end_date,
          legal_basis: item.legal_basis,
          gateway_sequence: item.gateway_sequence,
          change_reason: item.change_reason,
          contract_id: item.contract_id,
          created_at: item.created_at,
        }));

        this.termosTotal = response.data.map((item: any) => ({
          id: item.contract.id,
          number: item.contract.number,
          year: item.contract.year,
          goals: item.contract.goals,
          start_date: item.contract.start_date,
          end_date: item.contract.end_date,
        }));

        // Combina os dados após o carregamento
        this.combineTermsAndContracts();

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


  combineTermsAndContracts(): void {
    this.combinedTerms = this.termos.map((termo) => {
      const relatedContract = this.termosTotal.find(
        (contrato) => contrato.id === termo.contract_id
      );

      return {
        ...termo,
        contract_number: relatedContract?.number || 'N/A',
        contract_year: relatedContract?.year || 'N/A',
        contract_goals: relatedContract?.goals || 'N/A',
      };
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
    // Implemente aqui o serviço para deletar o termo
  }
}
