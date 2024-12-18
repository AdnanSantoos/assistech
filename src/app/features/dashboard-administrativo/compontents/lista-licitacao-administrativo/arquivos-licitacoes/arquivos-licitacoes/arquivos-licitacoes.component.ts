import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { LicitacaoArquivos } from '../../model/licitacoes-administrativo.model';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../../shared/models/shared.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdicionarLicitacaoMapper } from '../../../../../pncp-administrativo/components/dados-da-licitacao-administrativo/mapper/adicionar-licitacao.mapper';
import { AdicionarArquivoLicitacaoMapper } from '../mapper/AdicionarArquivoLicitacao.mapper';

@Component({
  selector: 'app-arquivos-licitacoes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIcon],
  templateUrl: './arquivos-licitacoes.component.html',
  styleUrls: ['./arquivos-licitacoes.component.scss'],
})
export class ArquivosLicitacoesComponent implements OnInit {
  formGroup!: FormGroup;
  arquivos: LicitacaoArquivos[] = [];
  isLoading = true;

  nameFile: string | null = null;
  selectedFiles: any[] = [];

  tiposDocumentos = [
    { value: 1, key: 'Aviso de Contratação Direta' },
    { value: 2, key: 'Edital' },
    { value: 3, key: 'Minuta do Contrato' },
    { value: 4, key: 'Termo de Referência' },
    { value: 5, key: 'Anteprojeto' },
    { value: 6, key: 'Projeto Básico' },
    { value: 7, key: 'Estudo Técnico Preliminar' },
    { value: 8, key: 'Projeto Executivo' },
    { value: 9, key: 'Mapa de Riscos' },
    { value: 10, key: 'DFD' },
    { value: 16, key: 'Outros' }
  ];
  arquivoSelecionadoInvalido = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      licitacaoId: string;
      tenant: string;
      number: string;
      year: number;
      process_number: string;
      unit?: {
        agency_country_register: string;
      };
    },
    private dialogRef: MatDialogRef<ArquivosLicitacoesComponent>,
    private licitacoesService: LicitacoesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      document_title: [null],
      label: [null],
      document_type_id: [null],
      file: [null],

    });

    if (this.data.unit?.agency_country_register) {
      this.loadArquivos(this.data.unit.agency_country_register, this.data.licitacaoId, 1);
    } else {
      console.error('Tenant (agency_country_register) não encontrado.');
    }
  }

  loadArquivos(tenant: string, procurementId: string, page: number): void {
    if (!tenant) {
      console.error('Tenant é obrigatório para carregar os arquivos.');
      return;
    }

    this.isLoading = true;
    this.licitacoesService.getLicitacoesArquivos(tenant, procurementId, page).subscribe({
      next: (response: RequisicaoModel<LicitacaoArquivos[]>) => {
        this.arquivos = response.data;
        this.isLoading = false;
        console.log('Arquivos carregados:', this.arquivos);
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos:', err);
        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    // Reseta o formulário para o estado inicial
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();

    // Limpa os arquivos selecionados
    this.selectedFiles = [];
    this.nameFile = null;

    console.log('Formulário e arquivos resetados.');
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  removerArquivo(arquivoId: string): void {
    this.arquivos = this.arquivos.filter((arquivo) => arquivo.id !== arquivoId);
    console.log('Arquivo removido:', arquivoId);
  }

  salvar(): void {
    console.log('Iniciando processo de salvar...');

    const procurementId = this.data.licitacaoId;
    const tenant = this.data.unit?.agency_country_register;

    if (!procurementId || !tenant) {
      console.error('ID da licitação ou tenant não encontrado.');
      return;
    }

    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    // Usa o mapper para preparar os dados
    const formData = AdicionarArquivoLicitacaoMapper.toSubmit(
      this.formGroup.value, // Dados do formulário
      { file: this.selectedFiles } // Corrigido: passa os arquivos como um array
    );

    console.log('FormData preparado:', formData);

    this.licitacoesService.createArquivoLicitacao({
      tenant: tenant,
      procurement: procurementId,
      file: formData,
    }).subscribe({
      next: () => {
        console.log('Arquivo salvo com sucesso!');
        this.loadArquivos(tenant, procurementId, 1);
        this.resetForm();
      },
      error: (err) => {
        console.error('Erro ao salvar o arquivo:', err);
      },
    });
  }


  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Apenas arquivos PDF são aceitos
        if (file.type === 'application/pdf') {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      }

      if (validFiles.length > 0) {
        // Armazena os arquivos em selectedFiles diretamente como um array
        this.selectedFiles = validFiles;
        this.nameFile = validFiles.map((file) => file.name).join(', ');
        console.log('Arquivos válidos selecionados:', this.nameFile);
      } else {
        console.log('Nenhum arquivo válido foi selecionado.');
      }

      if (invalidFiles.length > 0) {
        alert(`Os seguintes arquivos não são PDFs e foram ignorados: ${invalidFiles.join(', ')}`);
      }
    } else {
      console.log('Nenhum arquivo selecionado.');
    }
  }


}
