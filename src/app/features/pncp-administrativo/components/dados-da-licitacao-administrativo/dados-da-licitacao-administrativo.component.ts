import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdicionarLicitacaoService } from './service/adicionar-licitacao.services';
import {
  RequisicaoModel,
  selectModel,
} from '../../../../shared/models/shared.model';
import { AdicionarLicitacaoMapper } from './mapper/adicionar-licitacao.mapper';
import {
  OrgaoModel,
  OrgaoUnitModel,
  RequisicaoOrgaoModel,
  SelectedAgencies,
} from '../../../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { SidebarAdministrativoComponent } from '../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  ProcurementItem,
  ProcurementModel,
} from './model/adicionar-licitacao.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dados-da-licitacao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    SidebarAdministrativoComponent,
    NavbarComponent,
  ],
  providers: [BsModalService],

  templateUrl: './dados-da-licitacao-administrativo.component.html',
  styleUrl: './dados-da-licitacao-administrativo.component.scss',
})
export class DadosDaLicitacaoAdministrativoComponent {
  filtroForm: FormGroup;
  orgaos: OrgaoModel[] = [];
  agencyOptions: SelectedAgencies[] = [];
  unitOptions: selectModel[] = [];
  modalRef?: BsModalRef;
  selectedItem: any = null;
  showItems = false;
  showItemsFrontend: boolean = false;

  nameFile: string | null = null;
  selectedFiles: any[] = [];

  caminhoSelecionado: selectModel[] = [];
  cnpjSelecionado!: string;

  documentTypeOptions = [
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
    { value: 16, key: 'Outros' },
  ];
  callInstrumentOptions = [
    { value: 1, key: 'Edital' },
    { value: 2, key: 'Aviso de Contratação Direta' },
    { value: 3, key: 'Ato que Autoriza a Contratação Direta' },
    { value: 4, key: 'Edital de Chamamento Público' },
  ];
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
  modoDisputaOpcoes = [
    { value: 1, key: 'Aberto' },
    { value: 2, key: 'Fechado' },
    { value: 3, key: 'Aberto-Fechado' },
    { value: 6, key: 'Fechado-Aberto' },
    { value: 4, key: 'Dispensa Com Disputa' },
    { value: 5, key: 'Não se aplica' },
  ];
  legalBasicOptions = [
    { value: 1, key: 'Lei nº 14.133/2021, Art. 28, I' },
    { value: 2, key: 'Lei nº 14.133/2021, Art. 28, II' },
    { value: 3, key: 'Lei nº 14.133/2021, Art. 28, III' },
    { value: 4, key: 'Lei nº 14.133/2021, Art. 28, IV' },
    { value: 5, key: 'Lei nº 14.133/2021, Art. 28, V' },
    { value: 6, key: 'Lei nº 14.133/2021, Art. 74, I' },
    { value: 7, key: 'Lei nº 14.133/2021, Art. 74, II' },
    { value: 8, key: 'Lei nº 14.133/2021, Art. 74, III, a' },
    { value: 9, key: 'Lei nº 14.133/2021, Art. 74, III, b' },
    { value: 10, key: 'Lei nº 14.133/2021, Art. 74, III, c' },
    { value: 11, key: 'Lei nº 14.133/2021, Art. 74, III, d' },
    { value: 12, key: 'Lei nº 14.133/2021, Art. 74, III, e' },
    { value: 13, key: 'Lei nº 14.133/2021, Art. 74, III, f' },
    { value: 14, key: 'Lei nº 14.133/2021, Art. 74, III, g' },
    { value: 15, key: 'Lei nº 14.133/2021, Art. 74, III, h' },
    { value: 16, key: 'Lei nº 14.133/2021, Art. 74, IV' },
    { value: 17, key: 'Lei nº 14.133/2021, Art. 74, V' },
    { value: 18, key: 'Lei nº 14.133/2021, Art. 75, I' },
    { value: 19, key: 'Lei nº 14.133/2021, Art. 75, II' },
    { value: 20, key: 'Lei nº 14.133/2021, Art. 75, III, a' },
    { value: 21, key: 'Lei nº 14.133/2021, Art. 75, III, b' },
    { value: 22, key: 'Lei nº 14.133/2021, Art. 75, IV, a' },
    { value: 23, key: 'Lei nº 14.133/2021, Art. 75, IV, b' },
    { value: 24, key: 'Lei nº 14.133/2021, Art. 75, IV, c' },
    { value: 25, key: 'Lei nº 14.133/2021, Art. 75, IV, d' },
    { value: 26, key: 'Lei nº 14.133/2021, Art. 75, IV, e' },
    { value: 27, key: 'Lei nº 14.133/2021, Art. 75, IV, f' },
    { value: 28, key: 'Lei nº 14.133/2021, Art. 75, IV, g' },
    { value: 29, key: 'Lei nº 14.133/2021, Art. 75, IV, h' },
    { value: 30, key: 'Lei nº 14.133/2021, Art. 75, IV, i' },
    { value: 31, key: 'Lei nº 14.133/2021, Art. 75, IV, j' },
    { value: 32, key: 'Lei nº 14.133/2021, Art. 75, IV, k' },
    { value: 33, key: 'Lei nº 14.133/2021, Art. 75, IV, l' },
    { value: 34, key: 'Lei nº 14.133/2021, Art. 75, IV, m' },
    { value: 35, key: 'Lei nº 14.133/2021, Art. 75, V' },
    { value: 36, key: 'Lei nº 14.133/2021, Art. 75, VI' },
    { value: 37, key: 'Lei nº 14.133/2021, Art. 75, VII' },
    { value: 38, key: 'Lei nº 14.133/2021, Art. 75, VIII' },
    { value: 39, key: 'Lei nº 14.133/2021, Art. 75, IX' },
    { value: 40, key: 'Lei nº 14.133/2021, Art. 75, X' },
    { value: 41, key: 'Lei nº 14.133/2021, Art. 75, XI' },
    { value: 42, key: 'Lei nº 14.133/2021, Art. 75, XII' },
    { value: 43, key: 'Lei nº 14.133/2021, Art. 75, XIII' },
    { value: 44, key: 'Lei nº 14.133/2021, Art. 75, XIV' },
    { value: 45, key: 'Lei nº 14.133/2021, Art. 75, XV' },
    { value: 46, key: 'Lei nº 14.133/2021, Art. 75, XVI' },
    { value: 47, key: 'Lei nº 14.133/2021, Art. 78, I' },
    { value: 48, key: 'Lei nº 14.133/2021, Art. 78, II' },
    { value: 49, key: 'Lei nº 14.133/2021, Art. 78, III' },
    { value: 50, key: 'Lei nº 14.133/2021, Art. 74, caput' },
    { value: 51, key: 'Lei nº 14.284/2021, Art. 29, caput' },
    { value: 52, key: 'Lei nº 14.284/2021, Art. 24, § 1º' },
    { value: 53, key: 'Lei nº 14.284/2021, Art. 25, § 1º' },
    { value: 54, key: 'Lei nº 14.284/2021, Art. 34' },
    { value: 55, key: 'Lei nº 9.636/1998, Art. 11-C, I' },
    { value: 56, key: 'Lei nº 9.636/1998, Art. 11-C, II' },
    { value: 57, key: 'Lei nº 9.636/1998, Art. 24-C, I' },
    { value: 58, key: 'Lei nº 9.636/1998, Art. 24-C, II' },
    { value: 59, key: 'Lei nº 9.636/1998, Art. 24-C, III' },
    { value: 60, key: 'Lei nº 14.133/2021, Art. 75, XVII' },
    { value: 61, key: 'Lei nº 14.133/2021, Art. 76, I, a' },
    { value: 62, key: 'Lei nº 14.133/2021, Art. 76, I, b' },
    { value: 63, key: 'Lei nº 14.133/2021, Art. 76, I, c' },
    { value: 64, key: 'Lei nº 14.133/2021, Art. 76, I, d' },
    { value: 65, key: 'Lei nº 14.133/2021, Art. 76, I, e' },
    { value: 66, key: 'Lei nº 14.133/2021, Art. 76, I, f' },
    { value: 67, key: 'Lei nº 14.133/2021, Art. 76, I, g' },
    { value: 68, key: 'Lei nº 14.133/2021, Art. 76, I, h' },
    { value: 69, key: 'Lei nº 14.133/2021, Art. 76, I, i' },
    { value: 70, key: 'Lei nº 14.133/2021, Art. 76, I, j' },
    { value: 71, key: 'Lei nº 14.133/2021, Art. 76, II, a' },
    { value: 72, key: 'Lei nº 14.133/2021, Art. 76, II, b' },
    { value: 73, key: 'Lei nº 14.133/2021, Art. 76, II, c' },
    { value: 74, key: 'Lei nº 14.133/2021, Art. 76, II, d' },
    { value: 75, key: 'Lei nº 14.133/2021, Art. 76, II, e' },
    { value: 76, key: 'Lei nº 14.133/2021, Art. 76, II, f' },
    { value: 77, key: 'Lei nº 14.133/2021, Art. 75, XVIII' },
    { value: 78, key: 'Lei nº 14.628/2023, Art. 4º' },
    { value: 79, key: 'Lei nº 14.628/2023, Art. 12' },
    { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
    { value: 81, key: 'Lei nº 13.303/2016, Art. 27, Parágrafo 3º' },
    { value: 82, key: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, I' },
    { value: 83, key: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, II' },
    { value: 84, key: 'Lei nº 13.303/2016, Art. 29, I' },
    { value: 85, key: 'Lei nº 13.303/2016, Art. 29, II' },
    { value: 86, key: 'Lei nº 13.303/2016, Art. 29, III' },
    { value: 87, key: 'Lei nº 13.303/2016, Art. 29, IV' },
    { value: 88, key: 'Lei nº 13.303/2016, Art. 29, V' },
    { value: 89, key: 'Lei nº 13.303/2016, Art. 29, VI' },
    { value: 90, key: 'Lei nº 13.303/2016, Art. 29, VII' },
    { value: 91, key: 'Lei nº 13.303/2016, Art. 29, VIII' },
    { value: 92, key: 'Lei nº 13.303/2016, Art. 29, IX' },
    { value: 93, key: 'Lei nº 13.303/2016, Art. 29, X' },
    { value: 94, key: 'Lei nº 13.303/2016, Art. 29, XI' },
    { value: 95, key: 'Lei nº 13.303/2016, Art. 29, XII' },
    { value: 96, key: 'Lei nº 13.303/2016, Art. 29, XIII' },
    { value: 97, key: 'Lei nº 13.303/2016, Art. 29, XIV' },
    { value: 98, key: 'Lei nº 13.303/2016, Art. 29, XV' },
    { value: 99, key: 'Lei nº 13.303/2016, Art. 29, XVI' },
    { value: 100, key: 'Lei nº 13.303/2016, Art. 29, XVII' },
    { value: 101, key: 'Lei nº 13.303/2016, Art. 29, XVIII' },
    { value: 102, key: 'Lei nº 13.303/2016, Art. 30, caput, Inexigibilidade' },
    { value: 103, key: 'Lei nº 13.303/2016, Art. 30, caput, Credenciamento' },
    { value: 104, key: 'Lei nº 13.303/2016, Art. 30, I' },
    { value: 105, key: 'Lei nº 13.303/2016, Art. 30, II, a' },
    { value: 106, key: 'Lei nº 13.303/2016, Art. 30, II, b' },
    { value: 107, key: 'Lei nº 13.303/2016, Art. 30, II, c' },
    { value: 108, key: 'Lei nº 13.303/2016, Art. 30, II, d' },
    { value: 109, key: 'Lei nº 13.303/2016, Art. 30, II, e' },
    { value: 110, key: 'Lei nº 13.303/2016, Art. 30, II, f' },
    { value: 111, key: 'Lei nº 13.303/2016, Art. 30, II, g' },
    { value: 112, key: 'Lei nº 13.303/2016, Art. 31, Parágrafo 4º' },
    { value: 113, key: 'Lei nº 13.303/2016, Art. 32, IV' },
    { value: 114, key: 'Lei nº 13.303/2016, Art. 54, I' },
    { value: 115, key: 'Lei nº 13.303/2016, Art. 54, II' },
    { value: 116, key: 'Lei nº 13.303/2016, Art. 54, III' },
    { value: 117, key: 'Lei nº 13.303/2016, Art. 54, IV' },
    { value: 118, key: 'Lei nº 13.303/2016, Art. 54, V' },
    { value: 119, key: 'Lei nº 13.303/2016, Art. 54, VI' },
    { value: 120, key: 'Lei nº 13.303/2016, Art. 54, VII' },
    { value: 121, key: 'Lei nº 13.303/2016, Art. 54, VIII' },
    { value: 122, key: 'Lei nº 13.303/2016, Art. 63, I' },
    { value: 123, key: 'Lei nº 13.303/2016, Art. 63, III' },
    {
      value: 124,
      key: 'Regulamento Interno de Licitações e Contratos Estatais (Diálogo Competitivo)',
    },
    {
      value: 125,
      key: 'Regulamento Interno de Licitações e Contratos Estatais (Credenciamento)',
    },
    { value: 126, key: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, II' },
    { value: 127, key: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, V' },
    { value: 128, key: 'Lei nº 13.529/2017, Art. 5º' },
    { value: 129, key: 'Lei nº 8.629/1993, Art. 17, Parágrafo 3º, V' },
    { value: 130, key: 'Lei nº 10.847/2004, Art. 6º' },
    { value: 131, key: 'Lei nº 11.516/2007, Art. 14-A' },
    { value: 132, key: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, I' },
    { value: 133, key: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, II' },
    { value: 134, key: 'Lei nº 11.759/2008, Art. 18-A' },
    { value: 135, key: 'Lei nº 12.865/2013, Art. 18, Parágrafo 1º' },
    { value: 136, key: 'Lei nº 12.873/2013, Art. 42' },
    { value: 137, key: 'Lei nº 13.979/2020, Art. 4º, Parágrafo 1º' },
    { value: 138, key: 'Lei nº 11.947/2009, Art. 141' },
    { value: 139, key: 'Lei nº 11.947/2009, Art. 21' },
    { value: 140, key: 'Lei nº 14.133/2021, Art. 79, I' },
    { value: 141, key: 'Lei nº 14.133/2021, Art. 79, II' },
    { value: 142, key: 'Lei nº 14.133/2021, Art. 79, III' },
    { value: 149, key: 'MP nº 1.221/2024, Art. 2º, I (Calamidade pública)' },
    { value: 150, key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)' },
    { value: 151, key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)' },
  ];
  beneficiosEnum = [
    { value: 1, key: 'Participação exclusiva para ME/EPP' },
    { value: 2, key: 'Subcontratação para ME/EPP' },
    { value: 3, key: 'Cota reservada para ME/EPP' },
    { value: 4, key: 'Sem benefício' },
    { value: 5, key: 'Não se aplica' },
  ];
  itemCategoriaEnum = [
    { value: 1, key: 'Bens imóveis' },
    { value: 2, key: 'Bens móveis' },
    { value: 3, key: 'Não se aplica' },
  ];
  criterioDeJulgamentoEnum = [
    { value: 1, key: 'Menor Preço' },
    { value: 2, key: 'Maior Desconto' },
    { value: 3, key: 'Melhor técnica ou conteúdo artístico' },
    { value: 4, key: 'Técnica e preço' },
    { value: 5, key: 'Maior Lance' },
    { value: 6, key: 'Maior retorno econômico' },
    { value: 7, key: 'Não se aplica' },
    { value: 8, key: 'Melhor técnica' },
    { value: 9, key: 'Conteúdo artístico' },
  ];
  unidadeDeMedidaEnum = [
    { value: 'Caixa', key: 'Caixa' },
    { value: 'Bloco', key: 'Bloco' },
    { value: 'Centímetro', key: 'Centímetro' },
    { value: 'Dúzia', key: 'Dúzia' },
    { value: 'Fardo', key: 'Fardo' },
    { value: 'Frasco', key: 'Frasco' },
    { value: 'Galão', key: 'Galão' },
    { value: 'Grama', key: 'Grama' },
    { value: 'Quilograma', key: 'Quilograma' },
    { value: 'Metro', key: 'Metro' },
    { value: 'Jogo', key: 'Jogo' },
    { value: 'Par', key: 'Par' },
    { value: 'Kit', key: 'Kit' },
    { value: 'Lata', key: 'Lata' },
    { value: 'Litro', key: 'Litro' },
    { value: 'Pacote', key: 'Pacote' },
    { value: 'Unidade', key: 'Unidade' },
    { value: 'Resma', key: 'Resma' },
    { value: 'Rolo', key: 'Rolo' },
    { value: 'Saco', key: 'Saco' },
    { value: 'Serviço', key: 'Serviço' },
  ];

  materialOuServicoEnum = [
    { value: 'M', key: 'Material' },
    { value: 'S', key: 'Serviço' },
  ];

  constructor(
    private fb: FormBuilder,
    private _adicionarLicitacaoService: AdicionarLicitacaoService,
    private modalService: BsModalService,
    private _location: Location,
    private toastService: ToastrService
  ) {
    this.filtroForm = this.fb.group({
      agency: [null],
      unit_id: [null],
      document_title: [null],
      document_type_id: [{ value: null, disabled: false }],
      call_instrument_id: [{ value: null, disabled: true }],
      contracting_modality_id: [{ value: null, disabled: true }],
      dispute_mode_id: [{ value: null, disabled: true }],
      legal_basic_id: [{ value: null, disabled: true }],
      agency_country_register: [null],
      file: [null],
      number: [null],
      year: [null],
      process_number: [null],
      goals: [null],
      srp: [false],
      items: this.fb.array([]),
      additional_information: [null],
      opening_date_proposal: [null],
      closing_date_proposal: [null],
      contracting_situation_id: [{ value: 1, disabled: true }],
    });
    this.addItem();
    this.filtroForm
      .get('agency')
      ?.valueChanges.subscribe((selectedAgencies: SelectedAgencies) => {
        this.cnpjSelecionado = selectedAgencies.value;
        selectedAgencies.unit.forEach((unit) => {
          this.unitOptions.push({
            key: unit.name,
            value: unit.id,
          });
        });
      });
    this.filtroForm.get('document_type_id')?.valueChanges.subscribe(() => {
      this.filtroForm.get('call_instrument_id')?.enable(); // Habilita o campo Tipo de Instrumento Convocatório
    });

    this.filtroForm.get('unit_id')?.valueChanges.subscribe((v) => {
      this.filtroForm
        .get('agency_country_register')
        ?.setValue(this.cnpjSelecionado);
    });

    this.filtroForm
      .get('call_instrument_id')
      ?.valueChanges.subscribe((tipoInstrumentoSelecionado) => {
        this.filtroForm.get('contracting_modality_id')?.enable(); // Habilita o campo Modalidade de Contratação
        console.log(tipoInstrumentoSelecionado);
        switch (tipoInstrumentoSelecionado) {
          case 4:
            this.modalidadeContratoOpcoes = [
              { key: 'Dispensa Licitação', value: 8 },
              { key: 'Manifestação de Interesse', value: 10 },
              { key: 'Pré-qualificação', value: 11 },
              { key: 'Credenciamento', value: 12 },
            ];
            break;

          default: // edital - Aviso Contratação Direta - ato que autoriza a contratação direta
            this.modalidadeContratoOpcoes = [
              { key: 'Leilão - Eletrônico', value: 1 },
              { key: 'Diálogo Competitivo', value: 2 },
              { key: 'Concurso', value: 3 },
              { key: 'Concorrência - Eletrônica', value: 4 },
              { key: 'Concorrência - Presencial', value: 5 },
              { key: 'Pregão - Eletrônico', value: 6 },
              { key: 'Pregão - Presencial', value: 7 },
              { key: 'Dispensa Licitação', value: 8 },
              { key: 'Inexigibilidade', value: 9 },
              { key: 'Manifestação de Interesse', value: 10 },
              { key: 'Pré-qualificação', value: 11 },
              { key: 'Credenciamento', value: 12 },
              { key: 'Leilao - Presencial', value: 13 },
            ];
            break;
        }
      });

    this.filtroForm
      .get('contracting_modality_id')
      ?.valueChanges.subscribe((tipoModalidadeSelecionado) => {
        this.filtroForm.get('dispute_mode_id')?.enable(); // Habilita o campo Modo de Disputa
        switch (tipoModalidadeSelecionado) {
          case 1: //Leilão eletrônico
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 4, key: 'Lei nº 14.133/2021, Art. 28, IV' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 121, key: 'Lei nº 13.303/2016, Art. 54, VIII' },
            ];
            this.itemCategoriaEnum = [
              { value: 1, key: 'Bens imóveis' },
              { value: 2, key: 'Bens móveis' },
            ];
            this.beneficiosEnum = [{ value: 5, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [{ value: 5, key: 'Maior Lance' }];
            break;
          case 2: //Dialogo Competitivo
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 4, key: 'Lei nº 14.133/2021, Art. 28, IV' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 121, key: 'Lei nº 13.303/2016, Art. 54, VIII' },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          case 3: //Concurso
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 3, key: 'Lei nº 14.133/2021, Art. 28, III' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 116, key: 'Lei nº 13.303/2016, Art. 54, III' },
              { value: 117, key: 'Lei nº 13.303/2016, Art. 54, IV' },
              { value: 118, key: 'Lei nº 13.303/2016, Art. 54, V' },
              { value: 119, key: 'Lei nº 13.303/2016, Art. 54, VI' },
              { value: 120, key: 'Lei nº 13.303/2016, Art. 54, VII' },
              {
                value: 150,
                key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;
          case 4: // Concorrência - eletrônica
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 2, key: 'Lei nº 14.133/2021, Art. 28, II' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 114, key: 'Lei nº 13.303/2016, Art. 54, I' },
              { value: 115, key: 'Lei nº 13.303/2016, Art. 54, II' },
              { value: 116, key: 'Lei nº 13.303/2016, Art. 54, III' },
              { value: 117, key: 'Lei nº 13.303/2016, Art. 54, IV' },
              { value: 118, key: 'Lei nº 13.303/2016, Art. 54, V' },
              { value: 119, key: 'Lei nº 13.303/2016, Art. 54, VI' },
              { value: 120, key: 'Lei nº 13.303/2016, Art. 54, VII' },
              { value: 123, key: 'Lei nº 13.303/2016, Art. 63, III' },
              {
                value: 150,
                key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;
          case 5: // Concorrência - presencial
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 2, key: 'Lei nº 14.133/2021, Art. 28, II' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              {
                value: 150,
                key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          case 6: // Pregão - eletrônico
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 2, key: 'Lei nº 14.133/2021, Art. 28, II' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 113, key: 'Lei nº 13.303/2016, Art. 32, IV' },
              { value: 123, key: 'Lei nº 13.303/2016, Art. 63, III' },
              {
                value: 150,
                key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 5, key: 'Maior Lance' },
            ];
            break;

          case 7: // Pregão - Presencial
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 2, key: 'Lei nº 14.133/2021, Art. 28, II' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              {
                value: 150,
                key: 'MP nº 1.221/2024, Art. 2º, II (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 5, key: 'Maior Lance' },
            ];
            break;

          case 8: // Dispensa - Licitação
            this.modoDisputaOpcoes = [
              { value: 4, key: 'Dispensa Com Disputa' },
              { value: 5, key: 'Não se aplica' },
            ];
            this.legalBasicOptions = [
              { value: 18, key: 'Lei nº 14.133/2021, Art. 75, I' },
              { value: 19, key: 'Lei nº 14.133/2021, Art. 75, II' },
              { value: 20, key: 'Lei nº 14.133/2021, Art. 75, III, a' },
              { value: 21, key: 'Lei nº 14.133/2021, Art. 75, III, b' },
              { value: 22, key: 'Lei nº 14.133/2021, Art. 75, IV, a' },
              { value: 23, key: 'Lei nº 14.133/2021, Art. 75, IV, b' },
              { value: 24, key: 'Lei nº 14.133/2021, Art. 75, IV, c' },
              { value: 25, key: 'Lei nº 14.133/2021, Art. 75, IV, d' },
              { value: 26, key: 'Lei nº 14.133/2021, Art. 75, IV, e' },
              { value: 27, key: 'Lei nº 14.133/2021, Art. 75, IV, f' },
              { value: 28, key: 'Lei nº 14.133/2021, Art. 75, IV, g' },
              { value: 29, key: 'Lei nº 14.133/2021, Art. 75, IV, h' },
              { value: 30, key: 'Lei nº 14.133/2021, Art. 75, IV, i' },
              { value: 31, key: 'Lei nº 14.133/2021, Art. 75, IV, j' },
              { value: 32, key: 'Lei nº 14.133/2021, Art. 75, IV, k' },
              { value: 33, key: 'Lei nº 14.133/2021, Art. 75, IV, l' },
              { value: 34, key: 'Lei nº 14.133/2021, Art. 75, IV, m' },
              { value: 35, key: 'Lei nº 14.133/2021, Art. 75, V' },
              { value: 36, key: 'Lei nº 14.133/2021, Art. 75, VI' },
              { value: 37, key: 'Lei nº 14.133/2021, Art. 75, VII' },
              { value: 38, key: 'Lei nº 14.133/2021, Art. 75, VIII' },
              { value: 39, key: 'Lei nº 14.133/2021, Art. 75, IX' },
              { value: 40, key: 'Lei nº 14.133/2021, Art. 75, X' },
              { value: 41, key: 'Lei nº 14.133/2021, Art. 75, XI' },
              { value: 42, key: 'Lei nº 14.133/2021, Art. 75, XII' },
              { value: 43, key: 'Lei nº 14.133/2021, Art. 75, XIII' },
              { value: 44, key: 'Lei nº 14.133/2021, Art. 75, XIV' },
              { value: 45, key: 'Lei nº 14.133/2021, Art. 75, XV' },
              { value: 46, key: 'Lei nº 14.133/2021, Art. 75, XVI' },
              { value: 60, key: 'Lei nº 14.133/2021, Art. 75, XVII' },
              { value: 61, key: 'Lei nº 14.133/2021, Art. 76, I, a' },
              { value: 62, key: 'Lei nº 14.133/2021, Art. 76, I, b' },
              { value: 63, key: 'Lei nº 14.133/2021, Art. 76, I, c' },
              { value: 64, key: 'Lei nº 14.133/2021, Art. 76, I, d' },
              { value: 65, key: 'Lei nº 14.133/2021, Art. 76, I, e' },
              { value: 66, key: 'Lei nº 14.133/2021, Art. 76, I, f' },
              { value: 67, key: 'Lei nº 14.133/2021, Art. 76, I, g' },
              { value: 68, key: 'Lei nº 14.133/2021, Art. 76, I, h' },
              { value: 69, key: 'Lei nº 14.133/2021, Art. 76, I, i' },
              { value: 70, key: 'Lei nº 14.133/2021, Art. 76, I, j' },
              { value: 71, key: 'Lei nº 14.133/2021, Art. 76, II, a' },
              { value: 72, key: 'Lei nº 14.133/2021, Art. 76, II, b' },
              { value: 73, key: 'Lei nº 14.133/2021, Art. 76, II, c' },
              { value: 74, key: 'Lei nº 14.133/2021, Art. 76, II, d' },
              { value: 75, key: 'Lei nº 14.133/2021, Art. 76, II, e' },
              { value: 76, key: 'Lei nº 14.133/2021, Art. 76, II, f' },
              { value: 77, key: 'Lei nº 14.133/2021, Art. 75, XVIII' },
              { value: 78, key: 'Lei nº 14.628/2023, Art. 4º' },
              { value: 79, key: 'Lei nº 14.628/2023, Art. 12º' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 84, key: 'Lei nº 13.303/2016, Art. 29, I' },
              { value: 85, key: 'Lei nº 13.303/2016, Art. 29, II' },
              { value: 86, key: 'Lei nº 13.303/2016, Art. 29, III' },
              { value: 87, key: 'Lei nº 13.303/2016, Art. 29, IV' },
              { value: 88, key: 'Lei nº 13.303/2016, Art. 29, V' },
              { value: 89, key: 'Lei nº 13.303/2016, Art. 29, VI' },
              { value: 90, key: 'Lei nº 13.303/2016, Art. 29, VII' },
              { value: 91, key: 'Lei nº 13.303/2016, Art. 29, VIII' },
              { value: 92, key: 'Lei nº 13.303/2016, Art. 29, IX' },
              { value: 93, key: 'Lei nº 13.303/2016, Art. 29, X' },
              { value: 94, key: 'Lei nº 13.303/2016, Art. 29, XI' },
              { value: 95, key: 'Lei nº 13.303/2016, Art. 29, XII' },
              { value: 96, key: 'Lei nº 13.303/2016, Art. 29, XIII' },
              { value: 97, key: 'Lei nº 13.303/2016, Art. 29, XIV' },
              { value: 98, key: 'Lei nº 13.303/2016, Art. 29, XV' },
              { value: 99, key: 'Lei nº 13.303/2016, Art. 29, XVI' },
              { value: 100, key: 'Lei nº 13.303/2016, Art. 29, XVII' },
              { value: 101, key: 'Lei nº 13.303/2016, Art. 29, XVIII' },
              {
                value: 149,
                key: 'MP nº 1.221/2024, Art. 2º, I (Calamidade pública)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 5, key: 'Maior Lance' },
              { value: 7, key: 'Não se aplica' },
            ];
            break;
          case 9: // Inexigibilidade
            this.modoDisputaOpcoes = [{ value: 5, key: 'Não se aplica' }];
            this.legalBasicOptions = [
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 7, key: 'Não se aplica' },
            ];
            break;

          case 10: // Manifestação de Interesse
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 49, key: 'Lei nº 14.133/2021, Art. 78, III' },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 7, key: 'Não se aplica' },
            ];
            break;

          case 11: // Pre qualificação
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 48, key: 'Lei nº 14.133/2021, Art. 78, II' },
              { value: 112, key: 'Lei nº 13.303/2016, Art. 31, Parágrafo 4º' },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 7, key: 'Não se aplica' },
            ];
            break;

          case 12: // Credenciamento
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              {
                value: 125,
                key: 'Regulamento Interno de Licitações e Contratos Estatais (Credenciamento)',
              },
            ];
            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 7, key: 'Não se aplica' },
            ];
            break;

          case 13: // Leilão - Presencial
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 4, key: 'Lei nº 14.133/2021, Art. 28, IV' },
              { value: 80, key: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
              { value: 121, key: 'Lei nº 13.303/2016, Art. 54, VIII' },
            ];
            this.itemCategoriaEnum = [
              { value: 1, key: 'Bens imóveis' },
              { value: 2, key: 'Bens móveis' },
            ];
            this.criterioDeJulgamentoEnum = [{ value: 5, key: 'Maior Lance' }];
            break;
          case 14: // Inaplicalibiade da Licitação
            this.modoDisputaOpcoes = [
              { key: 'Aberto', value: 1 },
              { key: 'Fechado', value: 2 },
              { key: 'Aberto-Fechado', value: 3 },
              { key: 'Fechado-Aberto', value: 6 },
            ];
            this.legalBasicOptions = [
              { value: 81, key: 'Lei nº 13.303/2016, Art. 27, Parágrafo 3º' },
              {
                value: 82,
                key: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, I',
              },
              {
                value: 83,
                key: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, II',
              },
            ];

            this.itemCategoriaEnum = [{ value: 3, key: 'Não se aplica' }];
            this.criterioDeJulgamentoEnum = [
              { value: 1, key: 'Menor Preço' },
              { value: 2, key: 'Maior Desconto' },
              { value: 4, key: 'Técnica e preço' },
              { value: 5, key: 'Maior Lance' },
              { value: 6, key: 'Maior retorno econômico' },
              { value: 8, key: 'Melhor técnica' },
              { value: 9, key: 'Conteúdo artístico' },
            ];
            break;

          default:
            this.legalBasicOptions = [{ value: 4555, key: 'Não carregada.' }];
            break;
        }
      });
    this.filtroForm.get('dispute_mode_id')?.valueChanges.subscribe(() => {
      this.filtroForm.get('legal_basic_id')?.enable(); // Habilita o campo Âmparo Legal
    });
    this.loadOrgaos();
  }

  get items(): FormArray {
    return this.filtroForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      tenant_slug: [null],
      created_by_id: [null],
      procurement_id: [null],
      item_type: [null],
      benefit_type_id: [null],
      basic_productive_incentive: [false],
      description: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit_of_measurement: [null],
      estimated_unit_value: [null],
      total_value: [null],
      judging_criteria_id: [null],
      confidential_budget: [false],
      item_category_id: [null],
      assets: [null],
      real_estate_registry_code: [null],
      source_system_link: [null],
      justification_in_person: [null],
      applicability_normal_preference_margin: [false],
      applicability_additional_preference_margin: [false],
      normal_preference_margin_percentage: [null],
      additional_preference_margin_percentage: [null],
      ncm_nbs_code: [null],
      ncm_nbs_description: [null],
    });
  }

  // Adicionar um item ao FormArray
  addItem(): void {
    this.items.push(this.createItem());
  }

  // Remover um item do FormArray
  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  loadOrgaos(): void {
    this._adicionarLicitacaoService.getOrgaos().subscribe({
      next: (response: any) => {
        this.orgaos = response.data;
        this.agencyOptions = this.orgaos.map((orgao: any) => ({
          value: orgao.country_register,
          label: orgao.name,
          unit: orgao.units,
        }));
        this.unitOptions = [];
      },
      error: (err) => {
        console.error('Erro ao carregar órgãos:', err);
      },
    });
  }

  onFormSubmit(): void {
    const novaLicitacao = AdicionarLicitacaoMapper.toSubmit(
      this.filtroForm.value,
      this.selectedFiles,
      this.items.controls.length > 0 ? true : false
    );

    this._adicionarLicitacaoService
      .criarLicitacao(novaLicitacao)
      .subscribe((v) => {
        this.toastService.success('Licitação Criada com sucesso');
        this._location.back();
      });
  }

  onFileSelected(event: any, fieldName: any): void {
    const files: FileList = event.target.files;
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === 'application/pdf') {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      }

      if (validFiles.length > 0) {
        this.selectedFiles[fieldName] = validFiles;
        this.nameFile = validFiles.map((file) => file.name).join(', ');
        console.log('Arquivos válidos selecionados:', this.nameFile);
      }

      if (invalidFiles.length > 0) {
        alert(
          `Os seguintes arquivos não são PDFs e foram ignorados: ${invalidFiles.join(
            ', '
          )}`
        );
        console.log('Arquivos inválidos:', invalidFiles);
      }
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  }
  // Método para voltar
  onVoltar(): void {
    this._location.back();
  }
}
