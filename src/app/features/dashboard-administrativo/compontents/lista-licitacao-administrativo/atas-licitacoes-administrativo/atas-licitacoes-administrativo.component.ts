import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LicitacoesService } from '../service/licitacoes-administrativos.service';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArquivoUploadMapper, AtaLicitacaoMapper } from './mapper/ata.mapper';


@Component({
  selector: 'app-atas-licitacoes-administrativo',
  standalone: true,
  imports: [CommonModule, MatIcon, ReactiveFormsModule, MatIconModule],
  providers: [BsModalService],
  templateUrl: './atas-licitacoes-administrativo.component.html',
  styleUrls: ['./atas-licitacoes-administrativo.component.scss'],
})
export class AtasLicitacoesAdministrativoComponent implements OnInit {
  licitacaoId!: string; // Capturado da URL
  licitacao: { number: string; year: number; process_number: string, agency: string } | null = null; // Armazena os dados da licitação
  atas: any[] = []; // Armazena as atas de registro
  isLoading = true;
  currentPage = 1;
  totalPages = 1;
  procurementId: string = ''; 

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

  deleteForm!: FormGroup;
  formArquivo!: FormGroup; // Formulário de arquivos
  arquivos: any[] = []; // Lista de arquivos
  formCancelamento!: FormGroup; // Formulário de cancelamento

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

    this.formArquivo = this.fb.group({
      document_title: [''],         // Campo título do documento
      document_type_id: [''],       // Campo tipo de documento
      file: [null]                  // Campo arquivo
    });

    this.deleteForm = this.fb.group({
      justification: [null], // Campo obrigatório com validação mínima
    });

    this.formCancelamento = this.fb.group({
      date_canceled: [null],
      change_reason: [null],
    });

    this.procurementId = this.route.snapshot.params['id'];

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
          agency: response.data.agency.name
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
  openArquivosModal(template: TemplateRef<any>, ata: any): void {
    this.selectedAta = {
      id: ata.id,
      price_registry_number: ata.numero,
      year_of_registry: ata.ano,
      signature_date: ata.data_assinatura
    };

    this.loadArquivos(); // Carrega os arquivos relacionados à ATA selecionada

    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }


  loadArquivos(): void {
    if (!this.selectedAta?.id) {
      console.error('ID da ATA não encontrado.');
      return;
    }

    const ataId = this.selectedAta.id;

    this.licitacoesService.getAtaArquivos(ataId, 1).subscribe({
      next: (response) => {
        // Garante que response.data é um array
        if (Array.isArray(response.data)) {
          this.arquivos = response.data.map((file) => ({
            id: file.id,
            created_by_id: file.created_by_id,
            procurement_id: file.procurement_id,
            label: file.label, // Nome do arquivo
            mime: file.mime, // Tipo MIME do arquivo
            size: file.size, // Tamanho do arquivo
            extension: file.extension, // Extensão do arquivo
            gateway_location: file.gateway_location, // URL para download
            document_type_id: file.document_type_id, // Tipo de documento
            document_title: file.document_title, // Título do documento
            gateway_sequence: file.gateway_sequence, // Sequência no gateway
          }));
        } else {
          console.error('Resposta inválida: dados não são um array.');
          this.arquivos = [];
        }

        console.log('Arquivos carregados:', this.arquivos);
      },
      error: (err) => {
        console.error('Erro ao carregar arquivos da ATA:', err);
      },
    });
  }



  salvarArquivo(): void {
    if (this.formArquivo.valid) {
      const formValue = this.formArquivo.value;
      const selectedFile: File = this.formArquivo.get('file')?.value;

      if (!selectedFile) {
        console.error('Nenhum arquivo selecionado.');
        return;
      }

      // Mapeia os dados com o ArquivoUploadMapper
      const formData = ArquivoUploadMapper.toSubmit(formValue, selectedFile);

      const minutesId = this.selectedAta?.id;

      if (!minutesId) {
        console.error('ID da ATA não encontrado.');
        return;
      }

      this.licitacoesService.uploadArquivo(minutesId, formData).subscribe({
        next: () => {
          console.log('Arquivo enviado com sucesso!');
          this.loadArquivos(); // Recarrega a lista de arquivos
          this.formArquivo.reset();
        },
        error: (err) => {
          console.error('Erro ao enviar o arquivo:', err);
        },
      });
    } else {
      console.error('Formulário inválido.');
    }
  }
  onFileSelectedModal(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.formArquivo.patchValue({ file });
      console.log('Arquivo selecionado:', file);
    } else {
      console.warn('Nenhum arquivo selecionado.');
    }
  }

  // Baixa o arquivo
  downloadArquivo(arquivo: any): void {
    if (arquivo && arquivo.id) {
      console.log('Baixando arquivo com ID:', arquivo.id);
      // Implementar lógica para download real do arquivo, exemplo:
      window.open(arquivo.gateway_location, '_blank');
    } else {
      console.error('Dados do arquivo incompletos.');
    }
  }

  deleteArquivo(arquivo: any): void {
    console.log('Excluindo arquivo:', arquivo);
    // Adicione a lógica para excluir o arquivo
  }

  openDeleteModal(ata: any, template: TemplateRef<any>): void {
    this.selectedAta = ata; // Define a ata selecionada para exclusão
    this.modalRef = this.modalService.show(template, { class: 'modal-md' }); // Exibe o modal
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }

  confirmDelete(): void {
    if (this.deleteForm.valid) {
      const justification = this.deleteForm.get('justification')?.value;
      const ataId = this.selectedAta?.id;

      if (!ataId) {
        console.error('ID da ATA não encontrado.');
        return;
      }

      this.licitacoesService.deleteAta(ataId, justification).subscribe({
        next: () => {
          this.modalRef?.hide(); // Fecha o modal
          this.loadAtas(this.currentPage); // Recarrega a lista de atas
        },
        error: (err) => {
          console.error('Erro ao excluir a ATA:', err);
        },
      });
    }
  }
  openCancelamentoModal(template: TemplateRef<any>, ata: any): void {
    this.selectedAta = ata;
    this.formCancelamento.reset(); // Reseta o formulário
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  // Confirma o cancelamento da ATA
  confirmCancel(): void {
    const minutesId = this.selectedAta?.id;
  
    if (!this.procurementId || !minutesId) {
      console.error('IDs não encontrados:', {
        procurementId: this.procurementId,
        minutesId,
      });
      return;
    }
  
    const payload = {
      procurement_id: this.procurementId,
      change_reason: this.formCancelamento.value.change_reason,
      date_canceled: this.formCancelamento.value.date_canceled,
    };
  
    this.licitacoesService.cancelarAta(this.procurementId, minutesId, payload).subscribe({
      next: () => {
        console.log('ATA cancelada com sucesso!');
        this.loadAtas(this.currentPage); // Recarrega a lista de atas
        this.modalRef?.hide(); // Fecha o modal
      },
      error: (err) => {
        console.error('Erro ao cancelar a ATA:', err);
      },
    });
  }
  
}
