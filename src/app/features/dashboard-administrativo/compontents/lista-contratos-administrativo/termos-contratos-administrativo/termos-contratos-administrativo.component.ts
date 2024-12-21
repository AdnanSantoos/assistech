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
          ...item,
          contract: item.contract || null, // Certifique-se de mapear o contrato
        }));

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
    this.combinedTerms = this.termos.map((termo) => ({
      ...termo,
      contract_number: termo.contract?.number || '-',
      contract_year: termo.contract?.year || '-',
    }));

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
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos:', err);
      },
    });
  }
  visualizar(contrato: any): void {
    if (!contrato) {
      console.error('Contrato inválido ou não fornecido.');
      return;
    }

    // Extrair valores com validação e fallback
    const year = contrato?.contract?.year || contrato.year || null;
    const gateway_sequence = contrato?.contract?.gateway_sequence || contrato.gateway_sequence || null;
    const country_register = contrato?.contract?.procurement?.agency?.country_register || null;

    // Validar se os campos essenciais estão presentes
    if (!year || !gateway_sequence || !country_register) {
      console.error('Dados do contrato incompletos. Verifique os seguintes campos:');
      if (!year) console.error('Faltando o campo "year".');
      if (!gateway_sequence) console.error('Faltando o campo "gateway_sequence".');
      if (!country_register) console.error('Faltando o campo "country_register".');
      return;
    }

    // Construir a URL do contrato
    const baseUrl = 'https://treina.pncp.gov.br/app/contratos/';
    const fullUrl = `${baseUrl}${country_register}/${year}/${gateway_sequence}`;

    // Exibir ou abrir o link
    window.open(fullUrl, '_blank');
  }


  carregarContratos(page: number): void {
    this.contratosService.getContratos(page).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.termosTotal = response.data; // Atribui todo o array retornado
          this.totalItems = response.meta?.pagination.total || 0;
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
