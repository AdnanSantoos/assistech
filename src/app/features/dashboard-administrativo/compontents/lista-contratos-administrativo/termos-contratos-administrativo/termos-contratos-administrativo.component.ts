import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { ContratoModel, TermosContratosModel } from '../../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { MatIcon } from '@angular/material/icon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-termos-contratos-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterModule, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './termos-contratos-administrativo.component.html',
  styleUrls: ['./termos-contratos-administrativo.component.scss'],
})
export class TermosContratosAdministrativoComponent implements OnInit {
  contratoId!: string; // ID do contrato capturado da URL
  termos: TermosContratosModel[] = []; // Lista de termos carregados
  termosTotal: ContratoModel[] = []
  combinedTerms: any[] = [];
  deleteForm!: FormGroup;
  modalRef?: BsModalRef;
  isLoading = true; // Controle de carregamento
  currentPage = 1; // Página atual
  totalPages = 1; // Total de páginas
  totalItems = 0; // Total de itens
  selectedContrato: ContratoModel | null = null;
  currentFilePage: number = 1;
  files: any[] = [];
  termosCompletos: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private contratosService: ContratosService,
    private modalService: BsModalService,
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
    this.carregarContratos(this.currentPage);

  }


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
          gateway_sequence: item.contract.gateway_sequence,
          country_register: item.contract.country_register
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
      const countryRegister = relatedContract?.procurement?.agency?.country_register || 'N/A';
      const year = relatedContract?.year || 'N/A';

      return {
        ...termo,
        contract_number: relatedContract?.number || 'N/A',
        contract_goals: relatedContract?.goals || 'N/A',
        year: year,
        gateway_sequence: relatedContract?.gateway_sequence || 'N/A',
        country_register: countryRegister,
      };
    });
    console.log('Combined Terms:', this.combinedTerms);

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



  deleteTerm(termId: string): void {
    console.log(`Excluir termo com ID: ${termId}`);
    // Implemente aqui o serviço para deletar o termo
  }


  openFilesModal(contrato: ContratoModel, template: TemplateRef<any>): void {
    this.selectedContrato = contrato;
    this.loadContractFiles(contrato.id, this.currentFilePage);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  loadContractFiles(contractId: string | undefined, page: number): void {
    if (!contractId) {
      console.error('ID do contrato está indefinido.');
      return;
    }

    this.contratosService.getContractFiles(contractId, page).subscribe({
      next: (response) => {
        this.files = response.data;
        this.currentFilePage = page;
        console.log('Arquivos carregados:', this.files);
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos:', err);
      },
    });
  }
  visualizar(contrato: any): void {
    if (!contrato) {
      console.error('Contrato inválido.');
      return;
    }

    // Extraindo valores de forma segura com operador de optional chaining (?.)
    const year = contrato.year;
    const gateway_sequence = contrato.gateway_sequence;
    const country_register = contrato.procurement?.agency?.country_register;

    // Validação dos dados antes de construir a URL
    if (year && gateway_sequence && country_register) {
      const baseUrl = 'https://treina.pncp.gov.br/app/contratos/';
      const fullUrl = `${baseUrl}${country_register}/${year}/${gateway_sequence}`;

      console.log('URL do contrato:', fullUrl);
      window.open(fullUrl, '_blank');
    } else {
      console.error('Dados do contrato incompletos. Verifique:');
      if (!year) console.error('Faltando o campo "year".');
      if (!gateway_sequence) console.error('Faltando o campo "gateway_sequence".');
      if (!country_register)
        console.error('Faltando o campo "country_register" em procurement.agency.');
    }
  }




  carregarContratos(page: number): void {
    this.contratosService.getContratos(page).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.termosTotal = response.data; // Atribui todo o array retornado
          this.totalItems = response.meta?.pagination.total || 0;
          console.log('Contratos carregados:', this.termosTotal);
        } else {
          console.error('Resposta da API inválida ou vazia.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar contratos:', err);
      },
    });
  }


  onEdit(id: string): void {
  }
  openDeleteModal(contrato: ContratoModel, template: TemplateRef<any>): void {
    this.selectedContrato = contrato;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }

  confirmDelete(): void {
    if (this.deleteForm.valid && this.selectedContrato) {
      const justification = this.deleteForm.value.justification;

      this.contratosService.deleteContrato(this.selectedContrato.id, justification).subscribe({
        next: () => {
          this.modalRef?.hide();
          this.carregarContratos(this.currentPage); // Atualiza a lista
        },
        error: (err) => {
          this.modalRef?.hide();
        },
      });
    }
  }
  goBack(): void {
    this._location.back();
  }
}
