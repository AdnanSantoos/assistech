import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LicitacaoArquivos, LicitacaoModel } from './model/licitacoes-administrativo.model';
import { LicitacoesService } from './service/licitacoes-administrativos.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArquivosLicitacoesComponent } from './arquivos-licitacoes/arquivos-licitacoes/arquivos-licitacoes.component';
import { MatDialog } from '@angular/material/dialog';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-lista-licitacao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [BsModalService],
  templateUrl: './lista-licitacao-administrativo.component.html',
  styleUrls: ['./lista-licitacao-administrativo.component.scss'],
})
export class ListaLicitacaoAdministrativoComponent implements OnInit {
  modalRef?: BsModalRef;
  deleteForm!: FormGroup;
  selectedLicitacao: LicitacaoModel | null = null;
  currentProcurementId: string | null = null;
  displayedColumns: string[] = [
    'numSeq',
    'liciNum',
    'numCompra',
    'ano',
    'numProcesso',
    'orgao',
    'unidade',
    'criadoEm',
    'acoes',
  ];
  dataSource = new MatTableDataSource<LicitacaoModel>([]);
  pageSize = 10;
  currentPage = 1;
  totalPages = 0;
  totalRecords = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private licitacoesService: LicitacoesService, private route: ActivatedRoute,
    private dialog: MatDialog, private modalService: BsModalService, private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.loadLicitacoes(this.currentPage);
    this.loadOrgaos(this.currentPage)

    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadLicitacoes(page: number): void {
    this.licitacoesService.getLicitacoes(page).subscribe({
      next: (response) => {
        this.dataSource.data = response.data.map((licitacao, index) => ({
          ...licitacao,
          numSeq: (page - 1) * this.pageSize + index + 1,
        }));
        this.totalRecords = response.meta?.pagination.total || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erro ao carregar licitações:', err);
      },
    });
  }

  loadOrgaos(page: number): void {
    this.licitacoesService.getOrgaos(page).subscribe({
      next: (response) => {
        if (response && response.data) {
          console.log('Orgãos carregados com sucesso:', response.data);
        } else {
          console.warn('Nenhum órgão encontrado.');
        }
      },
      error: (error) => {
        console.error('Erro ao carregar órgãos:', error);
      }
    });
  }

  irParaPncp(page: number): void {
    this.licitacoesService.getLicitacoes(page).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          const licitacao = response.data[0];
          const { year, gateway_sequence, agency } = licitacao;

          if (agency && agency.country_register) {
            const baseUrl = 'https://treina.pncp.gov.br/app/editais/';
            const fullUrl = `${baseUrl}${agency.country_register}/${year}/${gateway_sequence}`;

            window.open(fullUrl, '_blank');
          } else {
            console.error('Invalid agency data or missing country_register.');
          }
        } else {
          console.warn('Nenhuma licitação encontrada.');
        }
      },
      error: (err) => {
        console.error('Erro ao buscar licitações:', err);
      },
    });
  }


  openArquivosDialog(item: LicitacaoModel): void {
    if (item && item.id) {
      this.dialog.open(ArquivosLicitacoesComponent, {
        width: '800px',
        panelClass: 'custom-dialog-container',
        data: {
          licitacaoId: item.id,
          tenant: item.unit?.agency_country_register, // Adiciona o tenant dinamicamente
          number: item.number,
          year: item.year,
          process_number: item.process_number,
          unit: item.unit, // Passa a unidade para o diálogo
        },
      });
    } else {
      console.error('O item ou o ID da licitação está ausente. Não foi possível abrir o diálogo.');
    }
  }



  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadLicitacoes(pageNumber);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLicitacoes(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLicitacoes(this.currentPage);
    }
  }


  openDeleteModal(licitacao: LicitacaoModel, template: TemplateRef<any>): void {
    this.selectedLicitacao = licitacao;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }


  confirmDelete(): void {
    if (this.deleteForm.valid && this.selectedLicitacao) {
      const justification = this.deleteForm.value.justification;

      this.licitacoesService.deleteLicitacao(this.selectedLicitacao.id, justification).subscribe({
        next: () => {
          console.log('Licitação excluída com sucesso');
          this.modalRef?.hide();
          this.loadLicitacoes(this.currentPage); // Atualiza a lista
        },
        error: (err) => {
          console.error('Erro ao excluir licitação:', err);
          this.modalRef?.hide();
        },
      });
    }
  }


}
