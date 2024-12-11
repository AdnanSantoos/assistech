import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { LicitacaoArquivos } from '../../model/licitacoes-administrativo.model';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../../shared/models/shared.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  tiposDocumentos = [
    { id: 1, label: 'Contrato' },
    { id: 2, label: 'Relatório' },
    { id: 3, label: 'Nota Fiscal' },
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
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      documentTitle: ['', Validators.required],
      documentType: ['', Validators.required],
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

  salvar(): void {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      console.error('Formulário inválido.');
      return;
    }

    if (!this.arquivos.length) {
      this.arquivoSelecionadoInvalido = true;
      console.error('Nenhum arquivo selecionado.');
      return;
    }

    console.log('Arquivos enviados:', this.arquivos);
    this.dialogRef.close({ success: true });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  removerArquivo(arquivoId: string): void {
    this.arquivos = this.arquivos.filter((arquivo) => arquivo.id !== arquivoId);
    console.log('Arquivo removido:', arquivoId);
  }

  selecionarArquivo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const novoArquivo: LicitacaoArquivos = {
        id: `${Date.now()}`,
        kind: 'document',
        label: this.tiposDocumentos.find(
          (tipo) => tipo.id === this.formGroup.value.documentType
        )?.label || 'Desconhecido',
        mime: file.type,
        size: file.size.toString(),
        extension: file.name.split('.').pop() || '',
        gateway_location: '',
        gateway_sequence: this.arquivos.length + 1,
        document_type_id: this.formGroup.value.documentType,
        document_title: this.formGroup.value.documentTitle,
      };

      this.arquivos.push(novoArquivo);
      this.arquivoSelecionadoInvalido = false;
      console.log('Arquivo selecionado:', novoArquivo);
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }
}
