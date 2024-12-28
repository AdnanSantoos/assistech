import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { LicitacoesService } from '../../service/licitacoes-administrativos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LicitacaoResultados } from '../../model/licitacoes-administrativo.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resultado-licitacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CurrencyPipe,
  ],
  providers: [BsModalService, provideNgxMask()],
  templateUrl: './resultado-licitacao.component.html',
  styleUrls: ['./resultado-licitacao.component.scss'],
})
export class ResultadoLicitacaoComponent implements OnInit {
  @ViewChild('addResultadoModal') addResultadoModal!: TemplateRef<any>;
  resultados: LicitacaoResultados[] = [];
  licitacao: { quantity?: number; estimated_unit_value?: number } = {};
  totalResults: number = 0;
  resultsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  modalRef?: BsModalRef;
  novoResultadoForm!: FormGroup;
  naturezaJuridicaOptions = [
    { value: '0000', key: 'Natureza Jurídica não informada' },
    { value: '1015', key: 'Órgão Público do Poder Executivo Federal' },
    {
      value: '1023',
      key: 'Órgão Público do Poder Executivo Estadual ou do Distrito Federal',
    },
    { value: '1031', key: 'Órgão Público do Poder Executivo Municipal' },
    { value: '1040', key: 'Órgão Público do Poder Legislativo Federal' },
    {
      value: '1058',
      key: 'Órgão Público do Poder Legislativo Estadual ou do Distrito Federal',
    },
    { value: '1066', key: 'Órgão Público do Poder Legislativo Municipal' },
    { value: '1074', key: 'Órgão Público do Poder Judiciário Federal' },
    { value: '1082', key: 'Órgão Público do Poder Judiciário Estadual' },
    { value: '1104', key: 'Autarquia Federal' },
    { value: '1112', key: 'Autarquia Estadual ou do Distrito Federal' },
    { value: '1120', key: 'Autarquia Municipal' },
    { value: '1139', key: 'Fundação Pública de Direito Público Federal' },
    {
      value: '1147',
      key: 'Fundação Pública de Direito Público Estadual ou do Distrito Federal',
    },
    { value: '1155', key: 'Fundação Pública de Direito Público Municipal' },
    { value: '1163', key: 'Órgão Público Autônomo Federal' },
    {
      value: '1171',
      key: 'Órgão Público Autônomo Estadual ou do Distrito Federal',
    },
    { value: '1180', key: 'Órgão Público Autônomo Municipal' },
    { value: '1198', key: 'Comissão Polinacional' },
    {
      value: '1210',
      key: 'Consórcio Público de Direito Público (Associação Pública)',
    },
    { value: '1228', key: 'Consórcio Público de Direito Privado' },
    { value: '1236', key: 'Estado ou Distrito Federal' },
    { value: '1244', key: 'Município' },
    { value: '1252', key: 'Fundação Pública de Direito Privado Federal' },
    {
      value: '1260',
      key: 'Fundação Pública de Direito Privado Estadual ou do Distrito Federal',
    },
    { value: '1279', key: 'Fundação Pública de Direito Privado Municipal' },
    { value: '1287', key: 'Fundo Público da Administração Indireta Federal' },
    {
      value: '1295',
      key: 'Fundo Público da Administração Indireta Estadual ou do Distrito Federal',
    },
    { value: '1309', key: 'Fundo Público da Administração Indireta Municipal' },
    { value: '1317', key: 'Fundo Público da Administração Direta Federal' },
    {
      value: '1325',
      key: 'Fundo Público da Administração Direta Estadual ou do Distrito Federal',
    },
    { value: '1333', key: 'Fundo Público da Administração Direta Municipal' },
    { value: '1341', key: 'União' },
    { value: '2011', key: 'Empresa Pública' },
    { value: '2038', key: 'Sociedade de Economia Mista' },
    { value: '2046', key: 'Sociedade Anônima Aberta' },
    { value: '2054', key: 'Sociedade Anônima Fechada' },
    { value: '2062', key: 'Sociedade Empresária Limitada' },
    { value: '2070', key: 'Sociedade Empresária em Nome Coletivo' },
    { value: '2089', key: 'Sociedade Empresária em Comandita Simples' },
    { value: '2097', key: 'Sociedade Empresária em Comandita por Ações' },
    { value: '2100', key: 'Sociedade Mercantil de Capital e Indústria' },
    { value: '2127', key: 'Sociedade em Conta de Participação' },
    { value: '2135', key: 'Empresário (Individual)' },
    { value: '2143', key: 'Cooperativa' },
    { value: '2151', key: 'Consórcio de Soc iedades' },
    { value: '2160', key: 'Grupo de Sociedades' },
    {
      value: '2178',
      key: 'Estabelecimento, no Brasil, de Sociedade Estrangeira',
    },
    {
      value: '2194',
      key: 'Estabelecimento, no Brasil, de Empresa Binacional Argentino-Brasileira',
    },
    { value: '2216', key: 'Empresa Domiciliada no Exterior' },
    { value: '2224', key: 'Clube/Fundo de Investimento' },
    { value: '2232', key: 'Sociedade Simples Pura' },
    { value: '2240', key: 'Sociedade Simples Limitada' },
    { value: '2259', key: 'Sociedade Simples em Nome Coletivo' },
    { value: '2267', key: 'Sociedade Simples em Comandita Simples' },
    { value: '2275', key: 'Sociedade Simples em Comandita por Ações' },
    { value: '2283', key: 'Empresa Binacional' },
    { value: '2291', key: 'Consórcio de Empregadores' },
    { value: '2305', key: 'Consórcio Simples' },
    {
      value: '2313',
      key: 'Empresa Individual de Responsabilidade Limitada (de Natureza Empresária)',
    },
    {
      value: '2321',
      key: 'Empresa Individual de Responsabilidade Limitada (de Natureza Simples)',
    },
    { value: '2330', key: 'Sociedade Unipessoal de Advocacia' },
    { value: '2348', key: 'Cooperativas de Consumo' },
    { value: '2356', key: 'Empresa Simples de Inovação - Inova Simples' },
    { value: '3034', key: 'Investidor Não Residente' },
    { value: '3069', key: 'Serviço Notarial e Registral (Cartório)' },
    { value: '3077', key: 'Fundação Privada' },
    { value: '3085', key: 'Serviço Social Autônomo' },
    { value: '3107', key: 'Condomínio Edilício' },
    { value: '3115', key: 'Comissão de Conciliação Prévia' },
    { value: '3131', key: 'Entidade de Mediação e Arbitragem' },
    { value: '3204', key: 'Entidade Sindical' },
    {
      value: '3212',
      key: 'Estabelecimento, no Brasil, de Fundação ou Associação Estrangeiras',
    },
    { value: '3220', key: 'Fundação ou Associação Domiciliada no Exterior' },
    { value: '3239', key: 'Organização Religiosa' },
    { value: '3247', key: 'Comunidade Indígena' },
    { value: '3255', key: 'Fundo Privado' },
    { value: '3263', key: 'Órgão de Direção Nacional de Partido Político' },
    { value: '3271', key: 'Órgão de Direção Regional de Partido Político' },
    { value: '3280', key: 'Órgão de Direção Local de Partido Político' },
    { value: '3298', key: 'Comitê Financeiro de Partido Político' },
    { value: '3301', key: 'Frente Plebiscitária ou Referendária' },
    { value: '3328', key: 'Organização Social (OS)' },
    {
      value: '3999',
      key: 'Plano de Benefícios de Previdência Complementar Fechada',
    },
    { value: '4014', key: 'Associação Privada' },
    { value: '4090', key: 'Empresa Individual Imobiliária' },
    { value: '4120', key: 'Candidato a Cargo Político Eletivo' },
    { value: '5010', key: 'Produtor Rural (Pessoa Física)' },
    { value: '5029', key: 'Organização Internacional' },
    { value: '5037', key: 'Representação Diplomática Estrangeira' },
    { value: '8885', key: 'Outras Instituições Extraterritoriais' },
  ];

  amparoParaDesempate = [
    { value: 145, key: 'Lei nº 14.133/2021, Art. 60, I' },
    { value: 146, key: 'Lei nº 14.133/2021, Art. 60, §1º, I' },
    { value: 147, key: 'Lei nº 14.133/2021, Art. 60, §1º, II' },
    { value: 148, key: 'Lei nº 14.133/2021, Art. 60, outros incisos' },
  ];

  amparoParaMargem = [
    { value: 143, key: 'Lei nº 14.133/2021, Art. 26, §1º, II' },
    { value: 144, key: 'Lei nº 14.133/2021, Art. 26, §2º' },
  ];

  paisDeOrigem = [
    { id: 'AND', label: 'Andorra'},
    { id: 'ARE', label: 'Emirados árabes Unidos'},
    { id: 'AFG', label: 'Afeganistão'},
    { id: 'ATG', label: 'Antígua e Barbuda'},
    { id: 'AIA', label: 'Anguilla'},
    { id: 'ALB', label: 'Albânia'},
    { id: 'ARM', label: 'Arménia'},
    { id: 'AGO', label: 'Angola'},
    { id: 'ATA', label: 'Antártida'},
    { id: 'ARG', label: 'Argentina'},
    { id: 'ASM', label: 'Samoa Americana'},
    { id: 'AUT', label: 'Austria'},
    { id: 'AUS', label: 'Austrália'},
    { id: 'ABW', label: 'Aruba'},
    { id: 'AZE', label: 'Azerbaijão'},
    { id: 'BIH', label: 'Bósnia e Herzegovina'},
    { id: 'BRB', label: 'Barbados'},
    { id: 'BGD', label: 'Bangladesh'},
    { id: 'BEL', label: 'Bélgica'},
    { id: 'BFA', label: 'Burkina Faso'},
    { id: 'BGR', label: 'Bulgária'},
    { id: 'BHR', label: 'Bahrein'},
    { id: 'BDI', label: 'Burundi'},
    { id: 'BEN', label: 'Benim'},
    { id: 'BLM', label: 'São Bartolomeu'},
    { id: 'BMU', label: 'Bermudas'},
    { id: 'BRN', label: 'Brunei'},
    { id: 'BOL', label: 'Bolívia'},
    { id: 'BES', label: 'Países Baixos Caribenhos'},
    { id: 'BRA', label: 'Brasil'},
    { id: 'BHS', label: 'Bahamas'},
    { id: 'BTN', label: 'Butão'},
    { id: 'BWA', label: 'Botswana'},
    { id: 'BLR', label: 'Bielorrússia'},
    { id: 'BLZ', label: 'Belize'},
    { id: 'CAN', label: 'Canadá'},
    { id: 'CCK', label: 'Ilhas Cocos'},
    { id: 'COD', label: 'República Democrática do Congo'},
    { id: 'CAF', label: 'República Centro-áfricana'},
    { id: 'COG', label: 'República do Congo'},
    { id: 'CHE', label: 'Suíça'},
    { id: 'CIV', label: 'Costa do Marfim'},
    { id: 'COK', label: 'Ilhas Cook'},
    { id: 'CHL', label: 'Chile'},
    { id: 'CMR', label: 'Camarões'},
    { id: 'CHN', label: 'China'},
    { id: 'COL', label: 'Colômbia'},
    { id: 'CRI', label: 'Costa Rica'},
    { id: 'CUB', label: 'Cuba'},
    { id: 'CPV', label: 'Cabo Verde'},
    { id: 'CUW', label: 'Curaçao'},
    { id: 'CXR', label: 'Ilha Christmas'},
    { id: 'CYP', label: 'Chipre'},
    { id: 'CZE', label: 'Tchéquia'},
    { id: 'DEU', label: 'Alemanha'},
    { id: 'DJI', label: 'Djibouti'},
    { id: 'DNK', label: 'Dinamarca'},
    { id: 'DMA', label: 'Dominique'},
    { id: 'DOM', label: 'República Dominicana'},
    { id: 'DZA', label: 'Argélia'},
    { id: 'ECU', label: 'Equador'},
    { id: 'EST', label: 'Estónia'},
    { id: 'EGY', label: 'Egitoe'},
    { id: 'ESH', label: 'República Democrática árabe Saariana'},
    { id: 'ERI', label: 'Eritreia'},
    { id: 'ESP', label: 'Espanha'},
    { id: 'ETH', label: 'Etiópia'},
    { id: 'FIN', label: 'Finlândia'},
    { id: 'FJI', label: 'Fiji'},
    { id: 'FLK', label: 'Ilhas Malvinas'},
    { id: 'FSM', label: 'Micronésia'},
    { id: 'FRO', label: 'Ilhas Feroé'},
    { id: 'FRA', label: 'França'},
    { id: 'GAB', label: 'Gabão'},
    { id: 'GBR', label: 'Reino Unido'},
    { id: 'GRD', label: 'Grenada'},
    { id: 'GEO', label: 'Geórgia'},
    { id: 'GUF', label: 'Guiana Francesa'},
    { id: 'GGY', label: 'Guernsey'},
    { id: 'GHA', label: 'Gana'},
    { id: 'GIB', label: 'Gibraltar'},
    { id: 'GRL', label: 'Groelândia'},
    { id: 'GMB', label: 'Gâmbia'},
    { id: 'GIN', label: 'Guiné'},
    { id: 'GLP', label: 'Guadalupe'},
    { id: 'GNQ', label: 'Guiné Equatorial'},
    { id: 'GRC', label: 'Grécia'},
    { id: 'SGS', label: 'Ilhas Geórgia e Sandwich do Sul'},
    { id: 'GUM', label: 'Guam'},
    { id: 'GTM', label: 'Guatemala'},
    { id: 'GNB', label: 'Guiné-Bissau'},
    { id: 'GUY', label: 'Guiana'},
    { id: 'HKG', label: 'Hong Kong'},
    { id: 'HND', label: 'Honduras'},
    { id: 'HRV', label: 'Croácia'},
    { id: 'HTI', label: 'Haití'},
    { id: 'HUN', label: 'Hungria'},
    { id: 'IDN', label: 'Indonesia'},
    { id: 'IRL', label: 'Irlanda'},
    { id: 'ISR', label: 'Israel'},
    { id: 'IMN', label: 'Ilha de Man'},
    { id: 'IND', label: 'índia'},
    { id: 'IOT', label: 'Território Britânico do Oceano índico'},
    { id: 'IRQ', label: 'Iraque'},
    { id: 'IRN', label: 'Irão'},
    { id: 'ISL', label: 'Islândia'},
    { id: 'ITA', label: 'Itália'},
    { id: 'JEY', label: 'Jersey'},
    { id: 'JAM', label: 'Jamaïca'},
    { id: 'JOR', label: 'Jordânia'},
    { id: 'JPN', label: 'Japão'},
    { id: 'KEN', label: 'Quênia'},
    { id: 'KGZ', label: 'Quirguistão'},
    { id: 'KHM', label: 'Camboja'},
    { id: 'KIR', label: 'Kiribati'},
    { id: 'COM', label: 'Comores'},
    { id: 'KNA', label: 'São Cristóvão e Nevis'},
    { id: 'PRK', label: 'Coreia do Norte'},
    { id: 'KOR', label: 'Coreia do Sul'},
    { id: 'KWT', label: 'Kuwait'},
    { id: 'CYM', label: 'Ilhas Cayman'},
    { id: 'KAZ', label: 'Cazaquistão'},
    { id: 'LAO', label: 'Laos'},
    { id: 'LBN', label: 'Líbano'},
    { id: 'LCA', label: 'Santa Lúcia'},
    { id: 'LIE', label: 'Liechtenstein'},
    { id: 'LKA', label: 'Sri Lanka'},
    { id: 'LBR', label: 'Libéria'},
    { id: 'LSO', label: 'Lesoto'},
    { id: 'LTU', label: 'Lituânia'},
    { id: 'LUX', label: 'Luxemburgo'},
    { id: 'LVA', label: 'Letónia'},
    { id: 'LBY', label: 'Líbia'},
    { id: 'MAR', label: 'Marrocos'},
    { id: 'MCO', label: 'Monaco'},
    { id: 'MDA', label: 'Moldávia'},
    { id: 'MNE', label: 'Montenegro'},
    { id: 'MAF', label: 'São Martinho'},
    { id: 'MDG', label: 'Madagáscar'},
    { id: 'MHL', label: 'Ilhas Marshall'},
    { id: 'MKD', label: 'Macedónia'},
    { id: 'MLI', label: 'Mali'},
    { id: 'MMR', label: 'Mianmar'},
    { id: 'MNG', label: 'Mongólia'},
    { id: 'MAC', label: 'Macau'},
    { id: 'MNP', label: 'Ilhas Marianas Setentrionais'},
    { id: 'MTQ', label: 'Martinica'},
    { id: 'MRT', label: 'Mauritanie'},
    { id: 'MSR', label: 'Montserrat'},
    { id: 'MLT', label: 'Malta'},
    { id: 'MUS', label: 'Maurícia'},
    { id: 'MDV', label: 'Maldivas'},
    { id: 'MWI', label: 'Malawi'},
    { id: 'MYS', label: 'Malásia'},
    { id: 'MEX', label: 'México'},
    { id: 'MOZ', label: 'Moçambique'},
    { id: 'NAM', label: 'Namíbia'},
    { id: 'NCL', label: 'Nova Caledónia'},
    { id: 'NER', label: 'Níger'},
    { id: 'NFK', label: 'Ilha Norfolk'},
    { id: 'NGA', label: 'Nígeria'},
    { id: 'NIC', label: 'Nicarágua'},
    { id: 'NLD', label: 'Países Baixos'},
    { id: 'NOR', label: 'Noruega'},
    { id: 'NPL', label: 'Nepal'},
    { id: 'NRU', label: 'Nauru'},
    { id: 'NIU', label: 'Niue'},
    { id: 'NZL', label: 'Nova Zelândia'},
    { id: 'OMN', label: 'Omã'},
    { id: 'PAN', label: 'Panama'},
    { id: 'PER', label: 'Perú'},
    { id: 'PYF', label: 'Polinésia Francesa'},
    { id: 'PNG', label: 'Papua-Nova Guiné'},
    { id: 'PHL', label: 'Filipinas'},
    { id: 'PAK', label: 'Paquistão'},
    { id: 'POL', label: 'Polónia'},
    { id: 'SPM', label: 'São Pedro e Miquelão'},
    { id: 'PCN', label: 'Ilhas Pitcairn'},
    { id: 'PRI', label: 'Puerto Rico'},
    { id: 'PSE', label: 'Palestina'},
    { id: 'PRT', label: 'Portugal'},
    { id: 'PLW', label: 'Palau'},
    { id: 'PRY', label: 'Paraguai'},
    { id: 'QAT', label: 'Catar'},
    { id: 'REU', label: 'Reunião'},
    { id: 'ROU', label: 'Roménia'},
    { id: 'SRB', label: 'Sérvia'},
    { id: 'RUS', label: 'Rússia'},
    { id: 'RWA', label: 'Ruanda'},
    { id: 'SLB', label: 'Ilhas Salomão'},
    { id: 'SHN', label: 'Santa Helena, Ascensão e Tristão da Cunha'},
    { id: 'SAU', label: 'Arábia Saudita'},
    { id: 'SYC', label: 'Seicheles'},
    { id: 'SDN', label: 'Sudão'},
    { id: 'SWE', label: 'Suécia'},
    { id: 'SGP', label: 'Singapura'},
    { id: 'SVN', label: 'Eslovênia'},
    { id: 'SVK', label: 'Eslováquia'},
    { id: 'SLE', label: 'Serra Leoa'},
    { id: 'SMR', label: 'San Marino'},
    { id: 'SEN', label: 'Senega'},
    { id: 'SOM', label: 'Somália'},
    { id: 'SUR', label: 'Suriname'},
    { id: 'SSD', label: 'Sudão do Sul'},
    { id: 'STP', label: 'São Tomé e Príncipe'},
    { id: 'SLV', label: 'El Salvador'},
    { id: 'SXM', label: 'Sint-Maarten'},
    { id: 'SYR', label: 'Síria'},
    { id: 'SWZ', label: 'eSwatani'},
    { id: 'TCA', label: 'Ilhas Turcas e Caicos'},
    { id: 'TCD', label: 'Chade'},
    { id: 'ATF', label: 'Terras Austrais e Antárticas Francesas'},
    { id: 'TGO', label: 'Togo'},
    { id: 'THA', label: 'Tailândia'},
    { id: 'TJK', label: 'Tajiquistão'},
    { id: 'TKL', label: 'Tokelau'},
    { id: 'TLS', label: 'Timor-Leste'},
    { id: 'TKM', label: 'Turquemenistão'},
    { id: 'TUN', label: 'Tunísia'},
    { id: 'TON', label: 'Tonga'},
    { id: 'TUR', label: 'Turquía'},
    { id: 'TTO', label: 'Trindade e Tobag'},
    { id: 'TWN', label: 'Taiwan'},
    { id: 'TUV', label: 'Tuvalu'},
    { id: 'TZA', label: 'Tanzânia'},
    { id: 'UKR', label: 'Ucrânia'},
    { id: 'UGA', label: 'Uganda'},
    { id: 'USA', label: 'Estados Unidos'},
    { id: 'URY', label: 'Uruguai'},
    { id: 'UZB', label: 'Uzbequistão'},
    { id: 'VAT', label: 'Vaticano'},
    { id: 'VCT', label: 'São Vicente e Granadinas'},
    { id: 'VEN', label: 'Venezuela'},
    { id: 'VGB', label: 'Ilhas Virgens Britânicas'},
    { id: 'VNM', label: 'Vietnã'},
    { id: 'VUT', label: 'Vanuatu'},
    { id: 'VIR', label: 'Ilhas Virgens dos Estados Unidos'},
    { id: 'WLF', label: 'Wallis e Futuna'},
    { id: 'WSM', label: 'Samoa'},
    { id: 'XKX', label: 'Kosovo'},
    { id: 'YEM', label: 'Iémen'},
    { id: 'MYT', label: 'Maiote'},
    { id: 'ZAF', label: 'áfrica do Sul'},
    { id: 'ZMB', label: 'Zâmbia'},
    { id: 'ZWE', label: 'Zimbabwe'},
  ]
  constructor(
    public dialogRef: MatDialogRef<ResultadoLicitacaoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { itemId: string; licitacaoId: string },
    private licitacoesService: LicitacoesService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.novoResultadoForm = this.fb.group({
      id: [''],
      procurement_item_id: [''],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unit_price: [0, [Validators.required, Validators.min(0)]],
      total_price: [0, [Validators.required, Validators.min(0)]],
      person_type: ['', [Validators.required]],
      supplier_ni: ['', [Validators.required]],
      supplier_name_or_social_reason: ['', [Validators.required]],
      supplier_size_id: [0, [Validators.required]],
      legal_nature_id: ['', [Validators.required]],
      country_code: ['', [Validators.required]],
      subcontracting_indicator: [false],
      srp_classification_order: [0],
      date: ['', [Validators.required]],
      discount_percentage: ['0.0000', [Validators.required]],
      gateway_sequence: [0, [Validators.required]],
      status: [1, [Validators.required]],
      preference_margin_applicability: [false],
      preference_margin_legal_basis: [null],
      product_origin_country: [null],
      benefit_me_epp_applicability: [false],
      tiebreaker_criterion_applicability: [false],
      tiebreaker_criterion_legal_basis: [null],
      foreign_currency_symbol: [null],
      foreign_currency_exchange_date: ['', [Validators.required]],
      foreign_currency_timezone_offset: [null],
      foreign_currency_nominal_value: [0, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data.licitacaoId && this.data.itemId) {
      this.loadItemDetails(this.data.licitacaoId, this.data.itemId);
      this.loadResultados();
    } else {
      console.error('IDs necessários (licitacaoId e itemId) não fornecidos.');
    }
  }

  loadItemDetails(licitacaoId: string, itemId: string): void {
    this.licitacoesService.getLicitacoesItens(licitacaoId, 1).subscribe({
      next: (response) => {
        const item = response.data.find((itm: any) => itm.id === itemId);
        if (item) {
          this.licitacao = {
            quantity: item.quantity,
            estimated_unit_value: item.estimated_unit_value,
          };
        } else {
          console.error('Item não encontrado.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar os detalhes do item:', err);
      },
    });
  }

  loadResultados(): void {
    this.licitacoesService
      .getResultadosItem(this.data.licitacaoId, this.data.itemId)
      .subscribe({
        next: (response) => {
          this.resultados = response.data || [];
          this.totalResults = this.resultados.length;
          this.totalPages = Math.ceil(this.totalResults / this.resultsPerPage);
          console.log('Resultados carregados:', this.resultados);
        },
        error: (err) => {
          console.error('Erro ao carregar resultados:', err);
        },
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadResultados();
    }
  }

  deleteResultado(resultadoId: string): void {
    console.log(`Excluir resultado com ID: ${resultadoId}`);
  }

  openAddResultadoModal(): void {
    this.modalRef = this.modalService.show(this.addResultadoModal, {
      class: 'modal-lg',
    });
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }

  adicionarResultado(): void {
    if (this.novoResultadoForm.valid) {
      const novoResultado = this.novoResultadoForm.value;

      console.log('Novo resultado adicionado:', novoResultado);

      this.resultados.push(novoResultado);

      // Exibe o toastr de sucesso
      this.toastr.success('Resultado adicionado com sucesso!', 'Sucesso');

      this.closeModal();
    } else {
      console.error('Formulário inválido');

      // Exibe o toastr de erro
      this.toastr.error('Por favor, preencha todos os campos obrigatórios.', 'Erro');

      this.novoResultadoForm.markAllAsTouched();
    }
  }
}
