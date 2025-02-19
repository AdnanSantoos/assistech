import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  ArquivoContratoModel,
  ContratoModel,
} from '../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { ContratosService } from '../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArquivosContratoMapper } from './mapper/arquivos-contratos.mapper';
import { FormErrorService } from '../../../../shared/services/form-error.service';

@Component({
  selector: 'app-lista-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [BsModalService],
  templateUrl: './lista-contratos-administrativo.component.html',
  styleUrls: ['./lista-contratos-administrativo.component.scss'],
})
export class ListaContratosAdministrativoComponent implements OnInit {
  selectedFileArquivo!: ArquivoContratoModel; // Representa um arquivo retornado pela API

  displayedColumns: string[] = [
    'numSeq',
    'contratoPNCP',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<ContratoModel>([]);
  totalPages = 0;
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  deleteForm!: FormGroup;
  modalRef?: BsModalRef;
  selectedContrato: ContratoModel | null = null;
  files: any[] = [];
  currentFilePage: number = 1;
  fileForm!: FormGroup;
  selectedFile: File | null = null; // Armazena o arquivo selecionado
  orgaos: any[] = []; // Armazena os órgãos
  filtersForm!: FormGroup;

  modalidadeContratoOpcoes = [
    { value: 1, key: 'Leilão - Eletrônico' },
    { value: 2, key: 'Diálogo Competitivo' },
    { value: 3, key: 'Concurso' },
    { value: 4, key: 'Concorrência - Eletrônica' },
    { value: 5, key: 'Concorrência - Presencial' },
    { value: 6, key: 'Pregão - Eletrônico' },
    { value: 7, key: 'Pregão - Presencial' },
    { value: 8, key: 'Dispensa de Licitação' },
    { value: 9, key: 'Inexigibilidade' },
    { value: 10, key: 'Manifestação de Interesse' },
    { value: 11, key: 'Pré-qualificação' },
    { value: 12, key: 'Credenciamento' },
    { value: 13, key: 'Leilão - Presencial' },
    { value: 14, key: 'Inaplicabilidade da Licitação' },
  ];
  tiposDocumentos = [
    { value: 12, key: 'Contrato' },
    { value: 13, key: 'Termo de Rescisão' },
    { value: 14, key: 'Termo de Aditivo' },
    { value: 15, key: 'Termo de Apostilamento' },
    { value: 17, key: 'Nota de Empenho' },
    { value: 18, key: 'Relatório Final de Contrato' },
    { value: 16, key: 'Outros' },
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private contratosService: ContratosService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private _location: Location,
    public route: ActivatedRoute,
    private _errorService: FormErrorService
  ) {
    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required]],
    });
    this.fileForm = this.fb.group({
      document_title: [null],
      document_type_id: [null],
      file: [null],
    });
    this.filtersForm = this.fb.group({
      number: [''],
      year: [''],
    });
  }

  ngOnInit() {
    this.carregarContratos(this.currentPage);
  }

  openFilesModal(contrato: ContratoModel, template: TemplateRef<any>): void {
    if (!contrato || !contrato.id) {
      console.error('Contrato inválido ou ID do contrato não fornecido.');
      return;
    }

    this.selectedContrato = contrato;

    // Chamada para carregar os arquivos do contrato
    this.getArquivosContractFiles(contrato.id, 1); // Carrega os arquivos da primeira página

    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  getArquivosContractFiles(contractId: string, page: number): void {
    this.contratosService.getArquivosContractFiles(contractId, page).subscribe({
      next: (response) => {
        this.files = response.data.map((file: ArquivoContratoModel) => ({
          ...file,
          size: +file.size, // Garantir que o tamanho seja numérico
        }));
        this.currentFilePage = page; // Atualiza a página atual
        console.log('Arquivos carregados:', this.files);
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos do contrato:', err);
      },
    });
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

  visualizar(value: any) {
    const contrato = value;
    const { year, gateway_sequence, procurement } = contrato;
    if (procurement && procurement.agency.country_register) {
      const baseUrl = 'https://pncp.gov.br/app/contratos/';
      const fullUrl = `${baseUrl}${procurement.agency.country_register}/${year}/${gateway_sequence}`;

      window.open(fullUrl, '_blank');
    } else {
      console.error('Invalid agency data or missing country_register.');
    }
  }

  applyFilters(): void {
    const filters = this.filtersForm.value;

    // Remove campos vazios
    const cleanedFilters = Object.keys(filters)
      .filter((key) => filters[key] !== null && filters[key] !== '')
      .reduce((acc, key) => {
        acc[key] = filters[key];
        return acc;
      }, {} as any);

    this.carregarContratos(this.currentPage, cleanedFilters);
  }

  carregarContratos(page: number, filters: any = {}): void {
    const params = {
      ...filters,
      page: page.toString(),
    };

    this.contratosService.getContratosWithFilters(params).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalItems = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.dataSource.paginator = this.paginator;
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
        .deleteContrato(this.selectedContrato.id, justification)
        .subscribe({
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
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.carregarContratos(this.currentPage);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.carregarContratos(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.carregarContratos(this.currentPage);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileForm.patchValue({ file }); // Atualiza o campo 'file' do formulário
    }
  }

  navigateFiles(direction: number): void {
    if (this.selectedContrato?.id) {
      this.getArquivosContractFiles(
        this.selectedContrato.id,
        this.currentFilePage + direction
      );
    }
  }

  onSubmitFileForm(): void {
    if (this.fileForm.valid) {
      // Obtém os valores do formulário
      const formValues = this.fileForm.value;

      // Obtém o arquivo diretamente do campo 'file'
      const file: File = formValues.file;

      // Verifica se o arquivo foi selecionado
      if (!file) {
        console.warn('Nenhum arquivo foi selecionado.');
        return;
      }

      // Converte os dados para FormData usando o Mapper
      const formData = ArquivosContratoMapper.toSubmit(formValues, file);

      // Chama o serviço para enviar os dados
      if (this.selectedContrato?.id) {
        this.contratosService
          .createArquivoContrato(this.selectedContrato.id, formData)
          .subscribe({
            next: () => {
              console.log('Arquivo enviado com sucesso.');
              this.fileForm.reset(); // Reseta o formulário após o envio
              this.modalRef?.hide(); // Fecha o modal após a exclusão
            },
            error: (err) => {
              if (err.error?.errors) {
                this._errorService.handleApiErrors(this.fileForm, err);
              }
            },
          });
      } else {
        console.warn('Contrato não selecionado.');
      }
    } else {
      console.warn('Formulário inválido.');
    }
  }

  onDeleteFile(file: ArquivoContratoModel): void {
    const confirmDelete = confirm(
      `Deseja realmente excluir o arquivo "${file.label}"?`
    );
    if (confirmDelete && this.selectedContrato) {
      this.contratosService
        .deleteArquivoTermos(
          this.selectedContrato.id,
          file,
          'Justificativa de exclusão'
        )
        .subscribe({
          next: () => {
            this.files = this.files.filter((f) => f.id !== file.id); // Remove o arquivo localmente
            console.log(`Arquivo "${file.label}" excluído com sucesso.`);
          },
          error: (err) => {
            console.error(`Erro ao excluir o arquivo "${file.label}":`, err);
          },
        });
    }
  }
  openDeleteArquivosModal(
    file: ArquivoContratoModel,
    template: TemplateRef<any>
  ): void {
    this.selectedFileArquivo = file; // Define o arquivo selecionado com tipagem correta
    this.deleteForm.reset(); // Reseta o formulário
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  confirmDeleteContratoArquivo(fileId: string): void {
    if (!this.selectedContrato?.id) {
      console.error('Contrato não selecionado.');
      return;
    }

    if (this.deleteForm.valid) {
      const justification = this.deleteForm.value.justification;

      this.contratosService
        .deleteArquivoContrato(this.selectedContrato.id, fileId, justification)
        .subscribe({
          next: () => {
            console.log('Arquivo excluído com sucesso.');
            // Remove o arquivo da lista local
            this.files = this.files.filter((file) => file.id !== fileId);
            this.modalRef?.hide(); // Fecha o modal após a exclusão
            window.location.reload(); // Atualiza a página após o sucesso
          },
          error: (err) => {
            console.error('Erro ao excluir arquivo:', err);
          },
        });
    } else {
      console.warn('Justificativa não foi preenchida.');
    }
  }
}
