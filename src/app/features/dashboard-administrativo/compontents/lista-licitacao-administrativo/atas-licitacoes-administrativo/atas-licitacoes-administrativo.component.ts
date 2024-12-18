import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { MatIcon } from '@angular/material/icon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AtaLicitacaoMapper } from './mapper/ata.mapper';


@Component({
  selector: 'app-atas-licitacoes-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon, ReactiveFormsModule],
  providers: [BsModalService],
  templateUrl: './atas-licitacoes-administrativo.component.html',
  styleUrls: ['./atas-licitacoes-administrativo.component.scss'],
})
export class AtasLicitacoesAdministrativoComponent implements OnInit {
  licitacaoId!: string; // Capturado da URL
  licitacao: { number: string; year: number; process_number: string } | null = null; // Armazena os dados da licitação
  atas: any[] = []; // Armazena as atas de registro
  isLoading = true;
  currentPage = 1;
  totalPages = 1;

  tiposDocumentos = [
    { value: 11, key: 'Minuta de Ata de Registro de Preços' },
    { value: 16, key: 'Outros' },
  ];
  modalRef?: BsModalRef; // Referência ao modal
  formAta!: FormGroup; // Formulário para criar nova ata
  formEditAta!: FormGroup;


  isEditMode = false; // Flag para controlar o modo de edição
  selectedAta: any = null; // Dados da ATA selecionada para edição
  modalTitle = 'Adicionar ATA'; // Título dinâmico do modal

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private licitacoesService: LicitacoesService,
    private modalService: BsModalService,
    private fb: FormBuilder,


  ) {
    this.formAta = this.fb.group({
      price_registry_number: [null],
      year_of_registry: [null],
      start_date_of_validity: [null],
      end_date_of_validity: [null],
      signature_date: [null],
      document_type_id: [null],
      document_title: [null],
      file: [null],
    });

    this.formEditAta = this.fb.group({
      price_registry_number: [{ value: null, disabled: true }], // Desabilitado
      year_of_registry: [{ value: null, disabled: true }], // Desabilitado
      signature_date: [null],
      start_date_of_validity: [null],
      end_date_of_validity: [null],
      change_reason: [null],
    });
  }

  ngOnInit() {
    // Captura o ID da licitação a partir da rota
    this.licitacaoId = this.route.snapshot.params['id'];

    if (this.licitacaoId) {
      this.loadLicitacaoDetalhes();
      this.loadAtas(this.currentPage);
    } else {
      console.error('ID da licitação não fornecido na rota.');
    }
  }

  loadLicitacaoDetalhes(): void {
    this.licitacoesService.getLicitacaoById(this.licitacaoId).subscribe({
      next: (response: any) => {
        this.licitacao = {
          number: response.data.number,
          year: response.data.year,
          process_number: response.data.process_number,
        };
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes da licitação:', err);
      },
    });
  }

  loadAtas(page: number): void {
    this.isLoading = true;

    this.licitacoesService.getLicitacaoAtas(this.licitacaoId, page).subscribe({
      next: (response: RequisicaoModel<any>) => {
        // Mapeia os dados da resposta para os campos necessários na tabela
        this.atas = response.data.map((ata: any) => ({
          id: ata.id, // Adiciona o campo id para usar na edição
          numero: ata.price_registry_number || 'N/A',
          ano: ata.year_of_registry || 'N/A',
          data_assinatura: ata.signature_date || 'N/A',
          inicio_vigencia: ata.start_date_of_validity || 'N/A',
          fim_vigencia: ata.end_date_of_validity || 'N/A',
          status: ata.date_canceled ? 'cancelada' : 'ativa',
          gateway_location: ata.gateway_location || '',
        }));

        this.totalPages = response.meta?.pagination?.last_page || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar as atas:', err);
        this.isLoading = false;
      },
    });
  }

  irParaPncp(ata: any): void {
    if (ata && ata.gateway_sequence && ata.year_of_registry && ata.procurement_id) {
      // Dados para construção do link
      const agencyCountryRegister = '13267315000141'; // Código fixo ou pode ser obtido dinamicamente, se necessário
      const year = ata.year_of_registry;
      const sequence = ata.gateway_sequence;

      // Construção do link baseado nos dados
      const baseUrl = 'https://treina.pncp.gov.br/app/atas/';
      const fullUrl = `${baseUrl}${agencyCountryRegister}/${year}/${ata.procurement_id}/${sequence}`;

      // Abre o link em uma nova aba
      window.open(fullUrl, '_blank');
    } else {
      console.error('Dados insuficientes para gerar o link da ATA.');
    }
  }

  deleteAta() {

  }
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadAtas(page);
    }
  }
  goBack(): void {
    this._location.back();
  }

  goToPreviousPage() {

  }

  goToNextPage() {

  }


  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  saveAta(): void {
    if (this.formAta.valid) {
      console.log('Iniciando o processo de salvar a ATA...');

      // Mapeia os dados do formulário e do arquivo
      const ataFormData = AtaLicitacaoMapper.toSubmit(this.formAta.value, { file: [this.formAta.value.file] });

      // Chama o serviço para salvar a ATA
      this.licitacoesService.createLicitacaoAta(this.licitacaoId, ataFormData).subscribe({
        next: () => {
          console.log('ATA criada com sucesso!');
          this.loadAtas(this.currentPage); // Recarrega a lista de atas
          this.closeModal(); // Fecha o modal
          this.formAta.reset(); // Reseta o formulário
        },
        error: (err) => {
          console.error('Erro ao salvar a ATA:', err);
        },
      });
    } else {
      console.error('Formulário inválido.');
    }
  }



  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formAta.patchValue({ file });
      console.log('Arquivo selecionado:', file);
    } else {
      console.error('Nenhum arquivo selecionado.');
    }
  }


  openEditModal(template: TemplateRef<any>, ataToEdit: any): void {
    this.isEditMode = true;
    this.selectedAta = ataToEdit;

    // Atualiza os campos necessários no formulário
    this.formEditAta.patchValue({
      price_registry_number: ataToEdit.numero,
      year_of_registry: ataToEdit.ano,
      start_date_of_validity: ataToEdit.inicio_vigencia.split(' ')[0],
      end_date_of_validity: ataToEdit.fim_vigencia.split(' ')[0],
      signature_date: ataToEdit.data_assinatura.split(' ')[0],
      change_reason: ataToEdit.change_reason || '',
    });

    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


  // Atualiza os dados da ATA
  updateAta(): void {
    if (this.formEditAta.valid) {
      const updatedData = this.formEditAta.getRawValue(); // Inclui valores desabilitados
      const formData = new FormData();

      // Adiciona os campos ao FormData
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== null && updatedData[key] !== undefined) {
          formData.append(key, updatedData[key]);
        }
      });

      // Captura os IDs necessários
      const procurementId = this.licitacaoId; // ID da licitação atual
      const minutesId = this.selectedAta?.id; // ID da ata sendo editada

      if (!procurementId || !minutesId) {
        console.error('IDs necessários não encontrados.');
        return;
      }

      // Chama o serviço para atualizar a ata
      this.licitacoesService
        .updateLicitacaoAta(procurementId, minutesId, formData)
        .subscribe({
          next: () => {
            console.log('ATA atualizada com sucesso!');
            this.loadAtas(this.currentPage); // Recarrega a lista de atas
            this.closeModal(); // Fecha o modal
          },
          error: (err) => {
            console.error('Erro ao atualizar a ATA:', err);
          },
        });
    } else {
      console.error('Formulário inválido para atualização.');
    }
  }

}
