import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import {
  ContratoModel,
  TermosContratosModel,
} from '../../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { MatIcon } from '@angular/material/icon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TermosContratosMapper } from './mapper/termos-contratos.mapper';

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
  termosTotal: ContratoModel[] = [];
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
  selectedFile: File | null = null; // Armazena o arquivo selecionado
  selectedTerm: TermosContratosModel | null = null;
  fileForm!: FormGroup;
  tiposDocumentos = [
    { value: 12, key: 'Contrato' },
    { value: 13, key: 'Termo de Rescisão' },
    { value: 14, key: 'Termo de Aditivo' },
    { value: 15, key: 'Termo de Apostilamento' },
    { value: 17, key: 'Nota de Empenho' },
    { value: 18, key: 'Relatório Final de Contrato' },
    { value: 16, key: 'Outros' },
  ];
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private fb: FormBuilder,

    private contratosService: ContratosService,
    private modalService: BsModalService
  ) {
    this.fileForm = this.fb.group({
      document_title: [null],
      document_type_id: [null],
      file: [null],
    });

    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required]], // Validação de campo obrigatório
    });

    this.contratosService.getContratosUpdatedListener().subscribe(() => {
      this.carregarContratos(this.currentPage); // Atualiza a tabela ao ser notificado
    });

    this.carregarContratos(this.currentPage); // Carregamento inicial
  }

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
      contract: termo.contract, // Adiciona a referência completa ao contrato
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

  openFilesModal(term: TermosContratosModel, template: TemplateRef<any>): void {
    this.selectedTerm = term; // Define o termo selecionado
    this.selectedContrato = term.contract ?? null; // Usa null se contract for undefined

    if (!this.selectedTerm.id) {
      console.error('O termo não possui um ID válido.');
      return;
    }

    // Carregar os arquivos relacionados ao termo
    this.loadContractFiles(this.selectedTerm.id, this.currentFilePage);

    // Exibir o modal
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  loadContractFiles(contractId: string, page: number): void {
    if (!contractId) {
      console.error('ID do contrato está indefinido.');
      return;
    }

    this.contratosService.getContractFiles(contractId, page).subscribe({
      next: (response) => {
        this.files = response.data.map((file: any) => ({
          ...file,
          size: parseInt(file.size, 10), // Certifica-se de que o tamanho está correto
        }));
        this.currentFilePage = page;
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos:', err);
      },
    });
  }
  onRemoveFile(file: any): void {
    if (confirm(`Tem certeza que deseja remover o arquivo "${file.label}"?`)) {
      this.contratosService.deleteFileTermos(file.id).subscribe({
        next: () => {
          this.files = this.files.filter((f) => f.id !== file.id);
        },
        error: (err) => {
          console.error('Erro ao remover arquivo:', err);
          alert('Ocorreu um erro ao remover o arquivo. Tente novamente.');
        },
      });
    }
  }
  onFileChangeTermos(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Armazena o arquivo selecionado
    }
  }

  visualizar(contrato: any): void {
    if (!contrato) {
      console.error('Contrato inválido ou não fornecido.');
      return;
    }

    // Extrair valores com validação e fallback
    const year = contrato?.contract?.year || contrato.year || null;
    const gateway_sequence =
      contrato?.contract?.gateway_sequence || contrato.gateway_sequence || null;
    const country_register =
      contrato?.contract?.procurement?.agency?.country_register || null;

    // Validar se os campos essenciais estão presentes
    if (!year || !gateway_sequence || !country_register) {
      console.error(
        'Dados do contrato incompletos. Verifique os seguintes campos:'
      );
      if (!year) console.error('Faltando o campo "year".');
      if (!gateway_sequence)
        console.error('Faltando o campo "gateway_sequence".');
      if (!country_register)
        console.error('Faltando o campo "country_register".');
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

  onEdit(id: string): void {}
  openDeleteModal(contrato: ContratoModel, template: TemplateRef<any>): void {
    this.selectedContrato = contrato;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }

  confirmDelete(): void {
    if (this.deleteForm.valid && this.selectedContrato) {
      const justification = this.deleteForm.value.justification;

      this.contratosService
        .deleteTermosContrato(this.selectedContrato.id, justification)
        .subscribe({
          next: () => {
            this.modalRef?.hide();
            window.location.reload(); // Atualiza a página após o sucesso
          },
          error: (err) => {
            this.modalRef?.hide();
            console.error('Erro ao excluir contrato:', err);
          },
        });
    } else {
      console.error('Formulário inválido ou contrato não selecionado.');
    }
  }

  goBack(): void {
    this._location.back();
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileForm.patchValue({ arquivo: file });
    }
  }

  onSubmitFile(): void {
    if (this.fileForm.invalid || !this.selectedFile) {
      console.error('Formulário inválido ou arquivo ausente.');
      return;
    }

    // Transforma os dados do formulário em FormData usando o mapper
    const formData = TermosContratosMapper.toSubmit(
      this.fileForm.value,
      this.selectedFile
    );

    // Envia os dados
    this.contratosService
      .createTermosContratos(this.selectedTerm?.id || '', formData)
      .subscribe({
        next: () => {
          // Atualiza a lista de arquivos carregados
          this.loadContractFiles(
            this.selectedTerm?.id || '',
            this.currentFilePage
          );

          // Reseta o formulário após envio
          this.fileForm.reset();
          this.selectedFile = null; // Limpa o arquivo selecionado
        },
        error: (err) => {
          console.error('Erro ao enviar arquivo:', err);
        },
      });
  }
}
