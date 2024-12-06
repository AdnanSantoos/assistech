import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LicitacaoArquivos } from '../../model/licitacoes-administrativo.model';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../../shared/models/shared.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arquivos-licitacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arquivos-licitacoes.component.html',
  styleUrls: ['./arquivos-licitacoes.component.scss'],
})
export class ArquivosLicitacoesComponent implements OnInit {
  arquivos: LicitacaoArquivos[] = [];
  isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { licitacaoId: string },
    private dialogRef: MatDialogRef<ArquivosLicitacoesComponent>,
    private licitacoesService: LicitacoesService
  ) {}

  ngOnInit(): void {
    this.loadArquivos(this.data.licitacaoId, 1);
  }

  loadArquivos(licitacaoId: string, page: number): void {
    this.isLoading = true;
    this.licitacoesService.getLicitacoesArquivos(licitacaoId, page).subscribe({
      next: (response: RequisicaoModel<LicitacaoArquivos[]>) => {
        this.arquivos = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos:', err);
        this.isLoading = false;
      },
    });
  }

  salvar(): void {
    console.log('Arquivos enviados:', this.arquivos);
    this.dialogRef.close({ success: true });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  removerArquivo(arquivoId: string): void {
    console.log('Removendo arquivo com ID:', arquivoId);
    this.arquivos = this.arquivos.filter((arquivo) => arquivo.id !== arquivoId);
  }
}
