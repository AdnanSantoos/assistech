import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdicionarLicitacaoService } from './service/adicionar-licitacao.services';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { AdicionarLicitacaoMapper } from './mapper/adicionar-licitacao.mapper';
import { OrgaoModel, OrgaoUnitModel, RequisicaoOrgaoModel } from '../../../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { SidebarAdministrativoComponent } from '../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  ], providers: [BsModalService],

  templateUrl: './dados-da-licitacao-administrativo.component.html',
  styleUrl: './dados-da-licitacao-administrativo.component.scss',
})
export class DadosDaLicitacaoAdministrativoComponent {
  filtroForm: FormGroup;
  orgaos: OrgaoModel[] = [];
  agencyOptions: { value: string; label: string }[] = [];
  unitOptions: { value: string; label: string }[] = [];
  modalRef?: BsModalRef;
  selectedItem: any = null;
  showItems = false;
  selectedFileName: string | null = null;

  documentTypeOptions = [
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
  ];
  callInstrumentOptions = [
    { value: 1, label: 'Edital' },
    { value: 2, label: 'Aviso de Contratação Direta' },
    { value: 3, label: 'Ato que Autoriza a Contratação Direta' },
    { value: 4, label: 'Edital de Chamamento Público' }
  ];
  contractingModalityOptions = [
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
  ];
  disputeModeOptions = [
    { value: 1, label: 'Aberto' },
    { value: 2, label: 'Fechado' },
    { value: 3, label: 'Aberto-Fechado' },
    { value: 4, label: 'Dispensa Com Disputa' },
    { value: 5, label: 'Não se aplica' },
    { value: 6, label: 'Fechado-Aberto' }
  ];
  legalBasicOptions = [
    { value: 1, label: 'Lei nº 14.133/2021, Art. 28, I' },
    { value: 2, label: 'Lei nº 14.133/2021, Art. 28, II' },
    { value: 3, label: 'Lei nº 14.133/2021, Art. 28, III' },
    { value: 4, label: 'Lei nº 14.133/2021, Art. 28, IV' },
    { value: 5, label: 'Lei nº 14.133/2021, Art. 28, V' },
    { value: 6, label: 'Lei nº 14.133/2021, Art. 74, I' },
    { value: 7, label: 'Lei nº 14.133/2021, Art. 74, II' },
    { value: 8, label: 'Lei nº 14.133/2021, Art. 74, III, a' },
    { value: 9, label: 'Lei nº 14.133/2021, Art. 74, III, b' },
    { value: 10, label: 'Lei nº 14.133/2021, Art. 74, III, c' },
    { value: 11, label: 'Lei nº 14.133/2021, Art. 74, III, d' },
    { value: 12, label: 'Lei nº 14.133/2021, Art. 74, III, e' },
    { value: 13, label: 'Lei nº 14.133/2021, Art. 74, III, f' },
    { value: 14, label: 'Lei nº 14.133/2021, Art. 74, III, g' },
    { value: 15, label: 'Lei nº 14.133/2021, Art. 74, III, h' },
    { value: 16, label: 'Lei nº 14.133/2021, Art. 74, IV' },
    { value: 17, label: 'Lei nº 14.133/2021, Art. 74, V' },
    { value: 18, label: 'Lei nº 14.133/2021, Art. 75, I' },
    { value: 19, label: 'Lei nº 14.133/2021, Art. 75, II' },
    { value: 20, label: 'Lei nº 14.133/2021, Art. 75, III, a' },
    { value: 21, label: 'Lei nº 14.133/2021, Art. 75, III, b' },
    { value: 22, label: 'Lei nº 14.133/2021, Art. 75, IV, a' },
    { value: 23, label: 'Lei nº 14.133/2021, Art. 75, IV, b' },
    { value: 24, label: 'Lei nº 14.133/2021, Art. 75, IV, c' },
    { value: 25, label: 'Lei nº 14.133/2021, Art. 75, IV, d' },
    { value: 26, label: 'Lei nº 14.133/2021, Art. 75, IV, e' },
    { value: 27, label: 'Lei nº 14.133/2021, Art. 75, IV, f' },
    { value: 28, label: 'Lei nº 14.133/2021, Art. 75, IV, g' },
    { value: 29, label: 'Lei nº 14.133/2021, Art. 75, IV, h' },
    { value: 30, label: 'Lei nº 14.133/2021, Art. 75, IV, i' },
    { value: 31, label: 'Lei nº 14.133/2021, Art. 75, IV, j' },
    { value: 32, label: 'Lei nº 14.133/2021, Art. 75, IV, k' },
    { value: 33, label: 'Lei nº 14.133/2021, Art. 75, IV, l' },
    { value: 34, label: 'Lei nº 14.133/2021, Art. 75, IV, m' },
    { value: 35, label: 'Lei nº 14.133/2021, Art. 75, V' },
    { value: 36, label: 'Lei nº 14.133/2021, Art. 75, VI' },
    { value: 37, label: 'Lei nº 14.133/2021, Art. 75, VII' },
    { value: 38, label: 'Lei nº 14.133/2021, Art. 75, VIII' },
    { value: 39, label: 'Lei nº 14.133/2021, Art. 75, IX' },
    { value: 40, label: 'Lei nº 14.133/2021, Art. 75, X' },
    { value: 41, label: 'Lei nº 14.133/2021, Art. 75, XI' },
    { value: 42, label: 'Lei nº 14.133/2021, Art. 75, XII' },
    { value: 43, label: 'Lei nº 14.133/2021, Art. 75, XIII' },
    { value: 44, label: 'Lei nº 14.133/2021, Art. 75, XIV' },
    { value: 45, label: 'Lei nº 14.133/2021, Art. 75, XV' },
    { value: 46, label: 'Lei nº 14.133/2021, Art. 75, XVI' },
    { value: 47, label: 'Lei nº 14.133/2021, Art. 78, I' },
    { value: 48, label: 'Lei nº 14.133/2021, Art. 78, II' },
    { value: 49, label: 'Lei nº 14.133/2021, Art. 78, III' },
    { value: 50, label: 'Lei nº 14.133/2021, Art. 74, caput' },
    { value: 51, label: 'Lei nº 14.284/2021, Art. 29, caput' },
    { value: 52, label: 'Lei nº 14.284/2021, Art. 24, § 1º' },
    { value: 53, label: 'Lei nº 14.284/2021, Art. 25, § 1º' },
    { value: 54, label: 'Lei nº 14.284/2021, Art. 34' },
    { value: 55, label: 'Lei nº 9.636/1998, Art. 11-C, I' },
    { value: 56, label: 'Lei nº 9.636/1998, Art. 11-C, II' },
    { value: 57, label: 'Lei nº 9.636/1998, Art. 24-C, I' },
    { value: 58, label: 'Lei nº 9.636/1998, Art. 24-C, II' },
    { value: 59, label: 'Lei nº 9.636/1998, Art. 24-C, III' },
    { value: 60, label: 'Lei nº 14.133/2021, Art. 75, XVII' },
    { value: 61, label: 'Lei nº 14.133/2021, Art. 76, I, a' },
    { value: 62, label: 'Lei nº 14.133/2021, Art. 76, I, b' },
    { value: 63, label: 'Lei nº 14.133/2021, Art. 76, I, c' },
    { value: 64, label: 'Lei nº 14.133/2021, Art. 76, I, d' },
    { value: 65, label: 'Lei nº 14.133/2021, Art. 76, I, e' },
    { value: 66, label: 'Lei nº 14.133/2021, Art. 76, I, f' },
    { value: 67, label: 'Lei nº 14.133/2021, Art. 76, I, g' },
    { value: 68, label: 'Lei nº 14.133/2021, Art. 76, I, h' },
    { value: 69, label: 'Lei nº 14.133/2021, Art. 76, I, i' },
    { value: 70, label: 'Lei nº 14.133/2021, Art. 76, I, j' },
    { value: 71, label: 'Lei nº 14.133/2021, Art. 76, II, a' },
    { value: 72, label: 'Lei nº 14.133/2021, Art. 76, II, b' },
    { value: 73, label: 'Lei nº 14.133/2021, Art. 76, II, c' },
    { value: 74, label: 'Lei nº 14.133/2021, Art. 76, II, d' },
    { value: 75, label: 'Lei nº 14.133/2021, Art. 76, II, e' },
    { value: 76, label: 'Lei nº 14.133/2021, Art. 76, II, f' },
    { value: 77, label: 'Lei nº 14.133/2021, Art. 75, XVIII' },
    { value: 78, label: 'Lei nº 14.628/2023, Art. 4º' },
    { value: 79, label: 'Lei nº 14.628/2023, Art. 12' },
    { value: 80, label: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
    { value: 81, label: 'Lei nº 13.303/2016, Art. 27, Parágrafo 3º' },
    { value: 82, label: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, I' },
    { value: 83, label: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, II' },
    { value: 84, label: 'Lei nº 13.303/2016, Art. 29, I' },
    { value: 85, label: 'Lei nº 13.303/2016, Art. 29, II' },
    { value: 86, label: 'Lei nº 13.303/2016, Art. 29, III' },
    { value: 87, label: 'Lei nº 13.303/2016, Art. 29, IV' },
    { value: 88, label: 'Lei nº 13.303/2016, Art. 29, V' },
    { value: 89, label: 'Lei nº 13.303/2016, Art. 29, VI' },
    { value: 90, label: 'Lei nº 13.303/2016, Art. 29, VII' },
    { value: 91, label: 'Lei nº 13.303/2016, Art. 29, VIII' },
    { value: 92, label: 'Lei nº 13.303/2016, Art. 29, IX' },
    { value: 93, label: 'Lei nº 13.303/2016, Art. 29, X' },
    { value: 94, label: 'Lei nº 13.303/2016, Art. 29, XI' },
    { value: 95, label: 'Lei nº 13.303/2016, Art. 29, XII' },
    { value: 96, label: 'Lei nº 13.303/2016, Art. 29, XIII' },
    { value: 97, label: 'Lei nº 13.303/2016, Art. 29, XIV' },
    { value: 98, label: 'Lei nº 13.303/2016, Art. 29, XV' },
    { value: 99, label: 'Lei nº 13.303/2016, Art. 29, XVI' },
    { value: 100, label: 'Lei nº 13.303/2016, Art. 29, XVII' },
    { value: 101, label: 'Lei nº 13.303/2016, Art. 29, XVIII' },
    { value: 102, label: 'Lei nº 13.303/2016, Art. 30, caput, Inexigibilidade' },
    { value: 103, label: 'Lei nº 13.303/2016, Art. 30, caput, Credenciamento' },
    { value: 104, label: 'Lei nº 13.303/2016, Art. 30, I' },
    { value: 105, label: 'Lei nº 13.303/2016, Art. 30, II, a' },
    { value: 106, label: 'Lei nº 13.303/2016, Art. 30, II, b' },
    { value: 107, label: 'Lei nº 13.303/2016, Art. 30, II, c' },
    { value: 108, label: 'Lei nº 13.303/2016, Art. 30, II, d' },
    { value: 109, label: 'Lei nº 13.303/2016, Art. 30, II, e' },
    { value: 110, label: 'Lei nº 13.303/2016, Art. 30, II, f' },
    { value: 111, label: 'Lei nº 13.303/2016, Art. 30, II, g' },
    { value: 112, label: 'Lei nº 13.303/2016, Art. 31, Parágrafo 4º' },
    { value: 113, label: 'Lei nº 13.303/2016, Art. 32, IV' },
    { value: 114, label: 'Lei nº 13.303/2016, Art. 54, I' },
    { value: 115, label: 'Lei nº 13.303/2016, Art. 54, II' },
    { value: 116, label: 'Lei nº 13.303/2016, Art. 54, III' },
    { value: 117, label: 'Lei nº 13.303/2016, Art. 54, IV' },
    { value: 118, label: 'Lei nº 13.303/2016, Art. 54, V' },
    { value: 119, label: 'Lei nº 13.303/2016, Art. 54, VI' },
    { value: 120, label: 'Lei nº 13.303/2016, Art. 54, VII' },
    { value: 121, label: 'Lei nº 13.303/2016, Art. 54, VIII' },
    { value: 122, label: 'Lei nº 13.303/2016, Art. 63, I' },
    { value: 123, label: 'Lei nº 13.303/2016, Art. 63, III' },
    { value: 124, label: 'Regulamento Interno de Licitações e Contratos Estatais (Diálogo Competitivo)' },
    { value: 125, label: 'Regulamento Interno de Licitações e Contratos Estatais (Credenciamento)' },
    { value: 126, label: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, II' },
    { value: 127, label: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, V' },
    { value: 128, label: 'Lei nº 13.529/2017, Art. 5º' },
    { value: 129, label: 'Lei nº 8.629/1993, Art. 17, Parágrafo 3º, V' },
    { value: 130, label: 'Lei nº 10.847/2004, Art. 6º' },
    { value: 131, label: 'Lei nº 11.516/2007, Art. 14-A' },
    { value: 132, label: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, I' },
    { value: 133, label: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, II' },
    { value: 134, label: 'Lei nº 11.759/2008, Art. 18-A' },
    { value: 135, label: 'Lei nº 12.865/2013, Art. 18, Parágrafo 1º' },
    { value: 136, label: 'Lei nº 12.873/2013, Art. 42' },
    { value: 137, label: 'Lei nº 13.979/2020, Art. 4º, Parágrafo 1º' },
    { value: 138, label: 'Lei nº 11.947/2009, Art. 141' },
    { value: 139, label: 'Lei nº 11.947/2009, Art. 21' },
    { value: 140, label: 'Lei nº 14.133/2021, Art. 79, I' },
    { value: 141, label: 'Lei nº 14.133/2021, Art. 79, II' },
    { value: 142, label: 'Lei nº 14.133/2021, Art. 79, III' }
  ];
  constructor(private fb: FormBuilder, private _adicionarLicitacaoService: AdicionarLicitacaoService, private modalService: BsModalService) {

    this.filtroForm = this.fb.group({
      agency: [''],
      unit_id: [''],
      document_title: [''],
      document_type_id: [null, {
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
      }],
      call_instrument_id: [null, {
        options: [
          { value: 1, label: 'Edital' },
          { value: 2, label: 'Aviso de Contratação Direta' },
          { value: 3, label: 'Ato que Autoriza a Contratação Direta' },
          { value: 4, label: 'Edital de Chamamento Público' }
        ]
      }],
      contracting_modality_id: [null, {
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
      }],
      dispute_mode_id: [null, {
        options: [
          { value: 1, label: 'Aberto' },
          { value: 2, label: 'Fechado' },
          { value: 3, label: 'Aberto-Fechado' },
          { value: 4, label: 'Dispensa Com Disputa' },
          { value: 5, label: 'Não se aplica' },
          { value: 6, label: 'Fechado-Aberto' }
        ]
      }],
      legal_basic_id: [null, {
        options: [
          { value: 1, label: 'Lei nº 14.133/2021, Art. 28, I' },
          { value: 2, label: 'Lei nº 14.133/2021, Art. 28, II' },
          { value: 3, label: 'Lei nº 14.133/2021, Art. 28, III' },
          { value: 4, label: 'Lei nº 14.133/2021, Art. 28, IV' },
          { value: 5, label: 'Lei nº 14.133/2021, Art. 28, V' },
          { value: 6, label: 'Lei nº 14.133/2021, Art. 74, I' },
          { value: 7, label: 'Lei nº 14.133/2021, Art. 74, II' },
          { value: 8, label: 'Lei nº 14.133/2021, Art. 74, III, a' },
          { value: 9, label: 'Lei nº 14.133/2021, Art. 74, III, b' },
          { value: 10, label: 'Lei nº 14.133/2021, Art. 74, III, c' },
          { value: 11, label: 'Lei nº 14.133/2021, Art. 74, III, d' },
          { value: 12, label: 'Lei nº 14.133/2021, Art. 74, III, e' },
          { value: 13, label: 'Lei nº 14.133/2021, Art. 74, III, f' },
          { value: 14, label: 'Lei nº 14.133/2021, Art. 74, III, g' },
          { value: 15, label: 'Lei nº 14.133/2021, Art. 74, III, h' },
          { value: 16, label: 'Lei nº 14.133/2021, Art. 74, IV' },
          { value: 17, label: 'Lei nº 14.133/2021, Art. 74, V' },
          { value: 18, label: 'Lei nº 14.133/2021, Art. 75, I' },
          { value: 19, label: 'Lei nº 14.133/2021, Art. 75, II' },
          { value: 20, label: 'Lei nº 14.133/2021, Art. 75, III, a' },
          { value: 21, label: 'Lei nº 14.133/2021, Art. 75, III, b' },
          { value: 22, label: 'Lei nº 14.133/2021, Art. 75, IV, a' },
          { value: 23, label: 'Lei nº 14.133/2021, Art. 75, IV, b' },
          { value: 24, label: 'Lei nº 14.133/2021, Art. 75, IV, c' },
          { value: 25, label: 'Lei nº 14.133/2021, Art. 75, IV, d' },
          { value: 26, label: 'Lei nº 14.133/2021, Art. 75, IV, e' },
          { value: 27, label: 'Lei nº 14.133/2021, Art. 75, IV, f' },
          { value: 28, label: 'Lei nº 14.133/2021, Art. 75, IV, g' },
          { value: 29, label: 'Lei nº 14.133/2021, Art. 75, IV, h' },
          { value: 30, label: 'Lei nº 14.133/2021, Art. 75, IV, i' },
          { value: 31, label: 'Lei nº 14.133/2021, Art. 75, IV, j' },
          { value: 32, label: 'Lei nº 14.133/2021, Art. 75, IV, k' },
          { value: 33, label: 'Lei nº 14.133/2021, Art. 75, IV, l' },
          { value: 34, label: 'Lei nº 14.133/2021, Art. 75, IV, m' },
          { value: 35, label: 'Lei nº 14.133/2021, Art. 75, V' },
          { value: 36, label: 'Lei nº 14.133/2021, Art. 75, VI' },
          { value: 37, label: 'Lei nº 14.133/2021, Art. 75, VII' },
          { value: 38, label: 'Lei nº 14.133/2021, Art. 75, VIII' },
          { value: 39, label: 'Lei nº 14.133/2021, Art. 75, IX' },
          { value: 40, label: 'Lei nº 14.133/2021, Art. 75, X' },
          { value: 41, label: 'Lei nº 14.133/2021, Art. 75, XI' },
          { value: 42, label: 'Lei nº 14.133/2021, Art. 75, XII' },
          { value: 43, label: 'Lei nº 14.133/2021, Art. 75, XIII' },
          { value: 44, label: 'Lei nº 14.133/2021, Art. 75, XIV' },
          { value: 45, label: 'Lei nº 14.133/2021, Art. 75, XV' },
          { value: 46, label: 'Lei nº 14.133/2021, Art. 75, XVI' },
          { value: 47, label: 'Lei nº 14.133/2021, Art. 78, I' },
          { value: 48, label: 'Lei nº 14.133/2021, Art. 78, II' },
          { value: 49, label: 'Lei nº 14.133/2021, Art. 78, III' },
          { value: 50, label: 'Lei nº 14.133/2021, Art. 74, caput' },
          { value: 51, label: 'Lei nº 14.284/2021, Art. 29, caput' },
          { value: 52, label: 'Lei nº 14.284/2021, Art. 24, § 1º' },
          { value: 53, label: 'Lei nº 14.284/2021, Art. 25, § 1º' },
          { value: 54, label: 'Lei nº 14.284/2021, Art. 34' },
          { value: 55, label: 'Lei nº 9.636/1998, Art. 11-C, I' },
          { value: 56, label: 'Lei nº 9.636/1998, Art. 11-C, II' },
          { value: 57, label: 'Lei nº 9.636/1998, Art. 24-C, I' },
          { value: 58, label: 'Lei nº 9.636/1998, Art. 24-C, II' },
          { value: 59, label: 'Lei nº 9.636/1998, Art. 24-C, III' },
          { value: 60, label: 'Lei nº 14.133/2021, Art. 75, XVII' },
          { value: 61, label: 'Lei nº 14.133/2021, Art. 76, I, a' },
          { value: 62, label: 'Lei nº 14.133/2021, Art. 76, I, b' },
          { value: 63, label: 'Lei nº 14.133/2021, Art. 76, I, c' },
          { value: 64, label: 'Lei nº 14.133/2021, Art. 76, I, d' },
          { value: 65, label: 'Lei nº 14.133/2021, Art. 76, I, e' },
          { value: 66, label: 'Lei nº 14.133/2021, Art. 76, I, f' },
          { value: 67, label: 'Lei nº 14.133/2021, Art. 76, I, g' },
          { value: 68, label: 'Lei nº 14.133/2021, Art. 76, I, h' },
          { value: 69, label: 'Lei nº 14.133/2021, Art. 76, I, i' },
          { value: 70, label: 'Lei nº 14.133/2021, Art. 76, I, j' },
          { value: 71, label: 'Lei nº 14.133/2021, Art. 76, II, a' },
          { value: 72, label: 'Lei nº 14.133/2021, Art. 76, II, b' },
          { value: 73, label: 'Lei nº 14.133/2021, Art. 76, II, c' },
          { value: 74, label: 'Lei nº 14.133/2021, Art. 76, II, d' },
          { value: 75, label: 'Lei nº 14.133/2021, Art. 76, II, e' },
          { value: 76, label: 'Lei nº 14.133/2021, Art. 76, II, f' },
          { value: 77, label: 'Lei nº 14.133/2021, Art. 75, XVIII' },
          { value: 78, label: 'Lei nº 14.628/2023, Art. 4º' },
          { value: 79, label: 'Lei nº 14.628/2023, Art. 12' },
          { value: 80, label: 'Lei nº 14.133/2021, Art. 1º, § 2º' },
          { value: 81, label: 'Lei nº 13.303/2016, Art. 27, Parágrafo 3º' },
          { value: 82, label: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, I' },
          { value: 83, label: 'Lei nº 13.303/2016, Art. 28, Parágrafo 3º, II' },
          { value: 84, label: 'Lei nº 13.303/2016, Art. 29, I' },
          { value: 85, label: 'Lei nº 13.303/2016, Art. 29, II' },
          { value: 86, label: 'Lei nº 13.303/2016, Art. 29, III' },
          { value: 87, label: 'Lei nº 13.303/2016, Art. 29, IV' },
          { value: 88, label: 'Lei nº 13.303/2016, Art. 29, V' },
          { value: 89, label: 'Lei nº 13.303/2016, Art. 29, VI' },
          { value: 90, label: 'Lei nº 13.303/2016, Art. 29, VII' },
          { value: 91, label: 'Lei nº 13.303/2016, Art. 29, VIII' },
          { value: 92, label: 'Lei nº 13.303/2016, Art. 29, IX' },
          { value: 93, label: 'Lei nº 13.303/2016, Art. 29, X' },
          { value: 94, label: 'Lei nº 13.303/2016, Art. 29, XI' },
          { value: 95, label: 'Lei nº 13.303/2016, Art. 29, XII' },
          { value: 96, label: 'Lei nº 13.303/2016, Art. 29, XIII' },
          { value: 97, label: 'Lei nº 13.303/2016, Art. 29, XIV' },
          { value: 98, label: 'Lei nº 13.303/2016, Art. 29, XV' },
          { value: 99, label: 'Lei nº 13.303/2016, Art. 29, XVI' },
          { value: 100, label: 'Lei nº 13.303/2016, Art. 29, XVII' },
          { value: 101, label: 'Lei nº 13.303/2016, Art. 29, XVIII' },
          { value: 102, label: 'Lei nº 13.303/2016, Art. 30, caput, Inexigibilidade' },
          { value: 103, label: 'Lei nº 13.303/2016, Art. 30, caput, Credenciamento' },
          { value: 104, label: 'Lei nº 13.303/2016, Art. 30, I' },
          { value: 105, label: 'Lei nº 13.303/2016, Art. 30, II, a' },
          { value: 106, label: 'Lei nº 13.303/2016, Art. 30, II, b' },
          { value: 107, label: 'Lei nº 13.303/2016, Art. 30, II, c' },
          { value: 108, label: 'Lei nº 13.303/2016, Art. 30, II, d' },
          { value: 109, label: 'Lei nº 13.303/2016, Art. 30, II, e' },
          { value: 110, label: 'Lei nº 13.303/2016, Art. 30, II, f' },
          { value: 111, label: 'Lei nº 13.303/2016, Art. 30, II, g' },
          { value: 112, label: 'Lei nº 13.303/2016, Art. 31, Parágrafo 4º' },
          { value: 113, label: 'Lei nº 13.303/2016, Art. 32, IV' },
          { value: 114, label: 'Lei nº 13.303/2016, Art. 54, I' },
          { value: 115, label: 'Lei nº 13.303/2016, Art. 54, II' },
          { value: 116, label: 'Lei nº 13.303/2016, Art. 54, III' },
          { value: 117, label: 'Lei nº 13.303/2016, Art. 54, IV' },
          { value: 118, label: 'Lei nº 13.303/2016, Art. 54, V' },
          { value: 119, label: 'Lei nº 13.303/2016, Art. 54, VI' },
          { value: 120, label: 'Lei nº 13.303/2016, Art. 54, VII' },
          { value: 121, label: 'Lei nº 13.303/2016, Art. 54, VIII' },
          { value: 122, label: 'Lei nº 13.303/2016, Art. 63, I' },
          { value: 123, label: 'Lei nº 13.303/2016, Art. 63, III' },
          { value: 124, label: 'Regulamento Interno de Licitações e Contratos Estatais (Diálogo Competitivo)' },
          { value: 125, label: 'Regulamento Interno de Licitações e Contratos Estatais (Credenciamento)' },
          { value: 126, label: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, II' },
          { value: 127, label: 'Lei nº 12.850/2013, Art. 3º, Parágrafo 1º, V' },
          { value: 128, label: 'Lei nº 13.529/2017, Art. 5º' },
          { value: 129, label: 'Lei nº 8.629/1993, Art. 17, Parágrafo 3º, V' },
          { value: 130, label: 'Lei nº 10.847/2004, Art. 6º' },
          { value: 131, label: 'Lei nº 11.516/2007, Art. 14-A' },
          { value: 132, label: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, I' },
          { value: 133, label: 'Lei nº 11.652/2008, Art. 8º, Parágrafo 2º, II' },
          { value: 134, label: 'Lei nº 11.759/2008, Art. 18-A' },
          { value: 135, label: 'Lei nº 12.865/2013, Art. 18, Parágrafo 1º' },
          { value: 136, label: 'Lei nº 12.873/2013, Art. 42' },
          { value: 137, label: 'Lei nº 13.979/2020, Art. 4º, Parágrafo 1º' },
          { value: 138, label: 'Lei nº 11.947/2009, Art. 141' },
          { value: 139, label: 'Lei nº 11.947/2009, Art. 21' },
          { value: 140, label: 'Lei nº 14.133/2021, Art. 79, I' },
          { value: 141, label: 'Lei nº 14.133/2021, Art. 79, II' },
          { value: 142, label: 'Lei nº 14.133/2021, Art. 79, III' }
        ]
      }],
      agency_country_register: [{ value: '', disabled: true }],
      file: [null],
      number: [''],
      year: [''],
      process_number: [''],
      goals: [''],
      srp: [false],
      additional_information: [''],
      opening_date_proposal: [''],
      closing_date_proposal: [''],
      contracting_situation_id: [{ value: 1, disabled: true }],
      basic_productive_incentive: [false],
      description: [''],
      quantity: [''],
      unit_of_measurement: [''],
      estimated_unit_value: [''],
      total_value: [''],
      judging_criteria_id: [''],
      confidential_budget: [false],
      item_category_id: [''],
      assets: [''],
      real_estate_registry_code: [''],
      source_system_link: [''],
      justification_in_person: [''],
      applicability_normal_preference_margin: [false],
      applicability_additional_preference_margin: [false],
      normal_preference_margin_percentage: [''],
      additional_preference_margin_percentage: [''],
      ncm_nbs_code: [''],
      ncm_nbs_description: ['']
    });

    this.loadOrgaos();
    this.onAgencyChange();

  }
  loadOrgaos(): void {
    this._adicionarLicitacaoService.getOrgaos().subscribe({
      next: (response: any) => {
        console.log('Resposta da API:', response);

        this.orgaos = response.data;

        this.agencyOptions = this.orgaos.map((orgao: any) => ({
          value: orgao.agency.country_register,
          label: orgao.agency.name
        }));

        console.log('Opções de Órgãos:', this.agencyOptions);

        this.unitOptions = [];
      },
      error: (err) => {
        console.error('Erro ao carregar órgãos:', err);
      }
    });
  }


  onAgencyChange(): void {
    this.filtroForm.get('agency')?.valueChanges.subscribe((selectedAgency) => {
      console.log('Órgão selecionado:', selectedAgency);

      const selectedOrgao = this.orgaos.find(
        (orgao) => orgao.country_register === selectedAgency
      );

      console.log('Detalhes do órgão selecionado:', selectedOrgao);

      if (selectedOrgao && selectedOrgao.units && selectedOrgao.units.length > 0) {
        this.unitOptions = selectedOrgao.units.map((unit: OrgaoUnitModel) => ({
          value: unit.id,
          label: unit.name,
          agency_country_register: unit.agency_country_register,
          name: unit.name
        }));
      } else {
        this.unitOptions = [{ value: '', label: 'Unidades não encontradas' }];
      }

      this.filtroForm.get('agency_country_register')?.setValue(
        selectedOrgao ? selectedOrgao.country_register : ''
      );

      console.log('Opções de Unidades:', this.unitOptions);
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

  toggleItemsSection(): void {
    this.showItems = !this.showItems;
    console.log('showItems toggled:', this.showItems); // Rastrear o estado de showItems

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
      console.log('File selected:', this.selectedFileName);
    } else {
      this.selectedFileName = null;
    }
  }
}
