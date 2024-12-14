import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { AdicionarLicitacaoService } from './service/adicionar-licitacao.services';
import { RequisicaoModel } from '../../shared/models/shared.model';
import { OrgaoModel } from '../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { AdicionarLicitacaoMapper } from './mapper/adicionar-licitacao.mapper';

@Component({
  selector: 'app-dados-da-licitacao-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dados-da-licitacao-administrativo.component.html',
  styleUrl: './dados-da-licitacao-administrativo.component.scss',
})
export class DadosDaLicitacaoAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];
  orgaos: OrgaoModel[] = [];

  constructor(private fb: FormBuilder, private _adicionarLicitacaoService: AdicionarLicitacaoService) {

    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null],
    });

    this.dynamicFields = [
      {
        name: 'agency', type: 'select', label: 'Órgão da licitação', options: [

        ]
      },
      {
        name: 'unit.name', type: 'select', label: 'Unidades Compradora', options: [

        ]
      },
      { name: 'document_title', type: 'text', label: 'Título do Documento' },
      {
        name: 'document_type_id',
        type: 'select',
        label: 'Tipo de Documento',
        options: [
          { value: 1, label: 'Aviso de Contratação Direta' },
          { value: 2, label: 'Edital' },
          { value: 3, label: 'Minuta do Contrato' },
          { value: 4, label: 'Termo de Referência' },
          { value: 5, label: 'Anteprojeto' },
          { value: 6, label: 'Projeto Básico' },
          { value: 7, label: 'Estudo Técnico Preliminar' },
          { value: 8, label: 'Projeto Executivo' },
          { value: 9, label: 'Mapa de Riscos' },
          { value: 10, label: 'DFD' },
          { value: 16, label: 'Para outros documentos do processo' }
        ]
      },
      {
        name: 'call_instrument_id',
        type: 'select',
        label: 'Tipo de Instrumento Convocatório',
        options: [
          { value: 1, label: 'Edital' },
          { value: 2, label: 'Aviso de Contratação Direta' },
          { value: 3, label: 'Ato que Autoriza a Contratação Direta' },
          { value: 4, label: 'Edital de Chamamento Público' }
        ]
      },
      {
        name: 'contracting_modality_id',
        type: 'select',
        label: 'Modalidade de Contratação',
        options: [
          { value: 1, label: 'Leilão - Eletrônico' },
          { value: 2, label: 'Diálogo Competitivo' },
          { value: 3, label: 'Concurso' },
          { value: 4, label: 'Concorrência - Eletrônica' },
          { value: 5, label: 'Concorrência - Presencial' },
          { value: 6, label: 'Pregão - Eletrônico' },
          { value: 7, label: 'Pregão - Presencial' },
          { value: 8, label: 'Dispensa de Licitação' },
          { value: 9, label: 'Inexigibilidade' },
          { value: 10, label: 'Manifestação de Interesse' },
          { value: 11, label: 'Pré-qualificação' },
          { value: 12, label: 'Credenciamento' },
          { value: 13, label: 'Leilão - Presencial' },
          { value: 14, label: 'Inaplicabilidade da Licitação' }
        ]
      },
      {
        name: 'dispute_mode_id',
        type: 'select',
        label: 'Modo de Disputa',
        options: [
          { value: 1, label: 'Aberto' },
          { value: 2, label: 'Fechado' },
          { value: 3, label: 'Aberto-Fechado' },
          { value: 4, label: 'Dispensa Com Disputa' },
          { value: 5, label: 'Não se aplica' },
          { value: 6, label: 'Fechado-Aberto' }
        ]
      },
      {
        name: 'legal_basic_id',
        type: 'select',
        label: 'Âmparo Legal',
        options: [
          { value: 1, label: 'Lei 14.133/2021, Art. 28, I' },
          { value: 2, label: 'Lei 14.133/2021, Art. 28, II' },
          { value: 3, label: 'Lei 14.133/2021, Art. 28, III' },
          { value: 4, label: 'Lei 14.133/2021, Art. 28, IV' },
          { value: 5, label: 'Lei 14.133/2021, Art. 28, V' },
          { value: 6, label: 'Lei 14.133/2021, Art. 74, I' },
          { value: 7, label: 'Lei 14.133/2021, Art. 74, II' },
          { value: 8, label: 'Lei 14.133/2021, Art. 74, III, a' },
          { value: 9, label: 'Lei 14.133/2021, Art. 74, III, b' },
          { value: 10, label: 'Lei 14.133/2021, Art. 74, III, c' },
          { value: 11, label: 'Lei 14.133/2021, Art. 74, III, d' },
          { value: 12, label: 'Lei 14.133/2021, Art. 74, III, e' },
          { value: 13, label: 'Lei 14.133/2021, Art. 74, III, f' },
          { value: 14, label: 'Lei 14.133/2021, Art. 74, III, g' },
          { value: 15, label: 'Lei 14.133/2021, Art. 74, III, h' },
          { value: 16, label: 'Lei 14.133/2021, Art. 74, IV' },
          { value: 17, label: 'Lei 14.133/2021, Art. 74, V' },
          { value: 18, label: 'Lei 14.133/2021, Art. 75, I' },
          { value: 19, label: 'Lei 14.133/2021, Art. 75, II' },
          { value: 20, label: 'Lei 14.133/2021, Art. 75, III, a' },
          { value: 21, label: 'Lei 14.133/2021, Art. 75, III, b' },
          { value: 22, label: 'Lei 14.133/2021, Art. 75, IV, a' },
          { value: 23, label: 'Lei 14.133/2021, Art. 75, IV, b' },
          { value: 24, label: 'Lei 14.133/2021, Art. 75, IV, c' },
          { value: 25, label: 'Lei 14.133/2021, Art. 75, IV, d' },
          { value: 26, label: 'Lei 14.133/2021, Art. 75, IV, e' },
          { value: 27, label: 'Lei 14.133/2021, Art. 75, IV, f' },
          { value: 28, label: 'Lei 14.133/2021, Art. 75, IV, g' },
          { value: 29, label: 'Lei 14.133/2021, Art. 75, IV, h' },
          { value: 30, label: 'Lei 14.133/2021, Art. 75, IV, i' },
          { value: 31, label: 'Lei 14.133/2021, Art. 75, IV, j' },
          { value: 32, label: 'Lei 14.133/2021, Art. 75, IV, k' },
          { value: 33, label: 'Lei 14.133/2021, Art. 75, IV, l' },
          { value: 34, label: 'Lei 14.133/2021, Art. 75, IV, m' },
          { value: 35, label: 'Lei 14.133/2021, Art. 75, V' },
          { value: 36, label: 'Lei 14.133/2021, Art. 75, VI' },
          { value: 37, label: 'Lei 14.133/2021, Art. 75, VII' },
          { value: 38, label: 'Lei 14.133/2021, Art. 75, VIII' },
          { value: 39, label: 'Lei 14.133/2021, Art. 75, IX' },
          { value: 40, label: 'Lei 14.133/2021, Art. 75, X' },
          { value: 41, label: 'Lei 14.133/2021, Art. 75, XI' },
          { value: 42, label: 'Lei 14.133/2021, Art. 75, XII' },
          { value: 43, label: 'Lei 14.133/2021, Art. 75, XIII' },
          { value: 44, label: 'Lei 14.133/2021, Art. 75, XIV' },
          { value: 45, label: 'Lei 14.133/2021, Art. 75, XV' },
          { value: 46, label: 'Lei 14.133/2021, Art. 75, XVI' },
          { value: 47, label: 'Lei 14.133/2021, Art. 78, I' },
          { value: 48, label: 'Lei 14.133/2021, Art. 78, II' },
          { value: 49, label: 'Lei 14.133/2021, Art. 78, III' },
          { value: 50, label: 'Lei 14.133/2021, Art. 74, caput' },
          { value: 51, label: 'Lei 14.284/2021, Art. 29, caput' },
          { value: 52, label: 'Lei 14.284/2021, Art. 24 § 1º' },
          { value: 53, label: 'Lei 14.284/2021, Art. 25 § 1º' },
          { value: 54, label: 'Lei 14.284/2021, Art. 34' },
          { value: 55, label: 'Lei 9.636/1998, Art. 11-C, I' },
          { value: 56, label: 'Lei 9.636/1998, Art. 11-C, II' },
          { value: 57, label: 'Lei 9.636/1998, Art. 24-C, I' },
          { value: 58, label: 'Lei 9.636/1998, Art. 24-C, II' },
          { value: 59, label: 'Lei 9.636/1998, Art. 24-C, III' },
          { value: 60, label: 'Lei 14.133/2021, Art. 75, XVII' },
          { value: 61, label: 'Lei 14.133/2021, Art. 76, I, a' },
          { value: 62, label: 'Lei 14.133/2021, Art. 76, I, b' },
          { value: 63, label: 'Lei 14.133/2021, Art. 76, I, c' },
          { value: 64, label: 'Lei 14.133/2021, Art. 76, I, d' },
          { value: 65, label: 'Lei 14.133/2021, Art. 76, I, e' },
          { value: 66, label: 'Lei 14.133/2021, Art. 76, I, f' },
          { value: 67, label: 'Lei 14.133/2021, Art. 76, I, g' },
          { value: 68, label: 'Lei 14.133/2021, Art. 76, I, h' },
          { value: 69, label: 'Lei 14.133/2021, Art. 76, I, i' },
          { value: 70, label: 'Lei 14.133/2021, Art. 76, I, j' },
          { value: 71, label: 'Lei 14.133/2021, Art. 76, II, a' },
          { value: 72, label: 'Lei 14.133/2021, Art. 76, II, b' },
          { value: 73, label: 'Lei 14.133/2021, Art. 76, II, c' },
          { value: 74, label: 'Lei 14.133/2021, Art. 76, II, d' },
          { value: 75, label: 'Lei 14.133/2021, Art. 76, II, e' },
          { value: 76, label: 'Lei 14.133/2021, Art. 76, II, f' },
          { value: 77, label: 'Lei 14.133/2021, Art. 75, XVIII' },
          { value: 78, label: 'Lei 14.628/2023, Art. 4º' },
          { value: 79, label: 'Lei 14.628/2023, Art. 12' },
          { value: 80, label: 'Lei 14.133/2021, Art. 1º, § 2º' }
        ]
      },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Documento da Licitação' },
      { name: 'number', type: 'text', label: 'Número da Compra' },
      { name: 'year', type: 'number', label: 'Ano da Compra' },
      { name: 'process_number', type: 'text', label: 'Número do Processo' },
      { name: 'goals', type: 'textarea', label: 'Objeto da Compra' },
      { name: 'srp', type: 'checkbox', label: 'Compra do sistema de registro de preços?' },
      { name: 'additional_information', type: 'textarea', label: 'Informação Complementar' },
      { name: 'opening_date_proposal', type: 'date', label: 'Data da Abertura da Proposta' },
      { name: 'closing_date_proposal', type: 'date', label: 'Data do Encerramento da Proposta' },
      {
        name: 'contracting_situation_id',
        type: 'select',
        label: 'Situação da Contratação',
        options: [
          { value: 1, label: 'Divulgada no PNCP: Contratação divulgada no PNCP. Situação atribuída na inclusão da contratação.' },
          { value: 2, label: 'Revogada: Contratação revogada conforme justificativa.' },
          { value: 3, label: 'Anulada: Contratação revogada conforme justificativa.' },
          { value: 4, label: 'Suspensa: Contratação suspensa conforme justificativa.' },
        ],
        disabled: true,
        value: 1,
      },
      { name: 'title', type: 'title', label: 'Itens da Licitação' },
      { name: 'basic_productive_incentive', type: 'checkbox', label: 'Incentivo Fiscal PPB?' },
      { name: 'description', type: 'textarea', label: 'Descrição do Item' },
      { name: 'quantity', type: 'number', label: 'Quantidade' },
      { name: 'unit_of_measurement', type: 'text', label: 'Unidade de Medida' },
      { name: 'estimated_unit_value', type: 'number', label: 'Valor Unitário Estimado' },
      { name: 'total_value', type: 'number', label: 'Valor Total' },
      { name: 'judging_criteria_id', type: 'text', label: 'Critério de Julgamento' },
      { name: 'confidential_budget', type: 'checkbox', label: 'Orçamento Sigiloso?' },
      { name: 'item_category_id', type: 'text', label: 'Categoria do Item' },
      { name: 'assets', type: 'text', label: 'Patrimônio' },
      { name: 'real_estate_registry_code', type: 'text', label: 'Código de Registro Imobiliário' },
      { name: 'source_system_link', type: 'text', label: 'Link do Sistema de Origem' },
      { name: 'justification_in_person', type: 'textarea', label: 'Justificativa Presencial' },
      { name: 'applicability_normal_preference_margin', type: 'checkbox', label: 'Aplicabilidade da Margem de Preferência Normal' },
      { name: 'applicability_additional_preference_margin', type: 'checkbox', label: 'Aplicabilidade da Margem de Preferência Adicional' },
      { name: 'normal_preference_margin_percentage', type: 'number', label: 'Percentual da Margem de Preferência Normal %' },
      { name: 'additional_preference_margin_percentage', type: 'number', label: 'Percentual da Margem de Preferência Adicional %' },
      { name: 'ncm_nbs_code', type: 'text', label: 'Código NCM/NBS' },
      { name: 'ncm_nbs_description', type: 'textarea', label: 'Descrição NCM/NBS' }
    ];

    this.loadOrgaos(1);
  }

  loadOrgaos(page: number): void {
    this._adicionarLicitacaoService.getOrgaos(page).subscribe({
      next: (response: RequisicaoModel<OrgaoModel[]>) => {
        this.orgaos = response.data;
        const campoFormularioAgencias = {
          name: 'agency',
          type: 'select',
          label: 'Órgão da licitação',
          options: this.orgaos.map((orgao: any) => ({
            value: orgao.agency.country_register,
            label: orgao.agency.name,
          })),
        };
        const campoFormularioUnidades = {
          name: 'unit_id',
          type: 'select',
          label: 'Unidade Compradora',
          options: this.orgaos.map((orgao: any) => ({
            value: orgao.unit.id,
            label: orgao.unit.name,
          })),
        };

        this.dynamicFields[0] = campoFormularioAgencias
        this.dynamicFields[1] = campoFormularioUnidades
        console.log('orgaos', this.orgaos)
      },
      error: (err) => {
        console.error('Erro ao carregar órgãos:', err);
      },
    });
  }

  onFileChange(event: any, fieldName: string): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filtroForm.patchValue({
        [fieldName]: file,
      });
    }
  }


  onFormSubmit(event: any): void {
    if (!this.filtroForm.valid) {
      console.error('O formulário contém erros. Verifique os campos obrigatórios.');
      return;
    }

    const formData = AdicionarLicitacaoMapper.toSubmit(event);
    this._adicionarLicitacaoService.criarLicitacao(formData).subscribe(
      (response) => {
        console.log('Licitação criada com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao criar a licitação:', error);
      }
    );
  }


}
