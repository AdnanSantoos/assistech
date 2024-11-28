import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, formatDate, Location } from '@angular/common';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { LicitacaoDetalhesModel } from '../../model/licitacoes-administrativo.model';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-editar-licitacoes-administrativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIcon, MatSlideToggleModule],
  templateUrl: './editar-licitacoes-administrativo.component.html',
  styleUrls: ['./editar-licitacoes-administrativo.component.scss'],
})
export class EditarLicitacoesAdministrativoComponent implements OnInit {
  ratificacaoForm!: FormGroup;
  licitacaoId!: string;
  agencyName: string = ''; // Nome do órgão para exibição
  Unidade: string = ''; 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private licitacoesService: LicitacoesService,
    private _location: Location
  ) { }

  ngOnInit(): void {
    // Inicializar formulário reativo
    this.ratificacaoForm = this.fb.group({
      call_instrument_id: ['', Validators.required],
      contracting_modality_id: ['', Validators.required],
      contracting_situation_id: ['', Validators.required],
      dispute_mode_id: ['', Validators.required],
      legal_basic_id: ['', Validators.required],
      number: ['', Validators.required],
      year: ['', Validators.required],
      process_number: ['', Validators.required],
      goals: ['', Validators.required],
      srp: [false],
      additional_information: [''],
      opening_date_proposal: ['', Validators.required],
      closing_date_proposal: ['', Validators.required],
    });

    // Obter ID da licitação da rota
    this.licitacaoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.licitacaoId) {
      this.carregarLicitacao(this.licitacaoId);
    }
  }

  // Método para carregar detalhes da licitação
  carregarLicitacao(id: string): void {
    this.licitacoesService.getLicitacaoById(id).subscribe({
      next: (response) => {
        const licitacao: LicitacaoDetalhesModel = response.data;
  
        // Atualizar nome do órgão e unidade
        this.agencyName = licitacao.agency.name;
        this.Unidade = licitacao.unit.name;
  
        // Formatando as datas para o formato datetime-local
        const formattedOpeningDate = formatDate(
          licitacao.opening_date_proposal,
          "yyyy-MM-dd'T'HH:mm",
          'en-US'
        );
        const formattedClosingDate = formatDate(
          licitacao.closing_date_proposal,
          "yyyy-MM-dd'T'HH:mm",
          'en-US'
        );
  
        // Preenchendo o formulário com os dados recebidos
        this.ratificacaoForm.patchValue({
          call_instrument_id: licitacao.call_instrument_id,
          contracting_modality_id: licitacao.contracting_modality_id,
          contracting_situation_id: licitacao.contracting_situation_id,
          dispute_mode_id: licitacao.dispute_mode_id,
          legal_basic_id: licitacao.legal_basic_id,
          number: licitacao.number,
          year: licitacao.year,
          process_number: licitacao.process_number,
          goals: licitacao.goals,
          srp: licitacao.srp,
          additional_information: licitacao.additional_information,
          opening_date_proposal: formattedOpeningDate,
          closing_date_proposal: formattedClosingDate,
        });
      }
    });
  }

  // Método para envio do formulário
  onSubmit(): void {
    if (this.ratificacaoForm.invalid) {
      this.toastr.warning('Preencha todos os campos obrigatórios.', 'Atenção');
      return;
    }

    const formData = this.ratificacaoForm.value;

    // Atualizar licitação
    this.licitacoesService.updateLicitacao(this.licitacaoId, formData).subscribe({
      next: () => {
        this.toastr.success('Licitação atualizada com sucesso!', 'Sucesso');
        this.router.navigate(['/adm/licitacoes']);
      },
      error: () => {
        this.toastr.error('Erro ao atualizar a licitação. Tente novamente.', 'Erro');
      },
    });
  }

  // Método para voltar
  onVoltar(): void {
    this._location.back();
  }
}
