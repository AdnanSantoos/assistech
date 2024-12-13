import { RequisicaoModel } from "../../../../../shared/models/shared.model";
import { AgenciaModel, UnidadeModel } from "../../unidades-administrativo/model/unidades-administrativo.model";

export interface LicitacaoModel {
  id: string;
  number: string;
  process_number: string;
  year: number;
  gateway_sequence: number;
  created_at: string; // Data em formato ISO
  agency: AgenciaModel; // Relacionamento com Agência
  unit: UnidadeModel;  // Relacionamento com Unidade
  imported: boolean;
}

export interface LicitacaoDetalhesModel {
  id: string;
  created_by_id: string;
  call_instrument_id: number;
  contracting_modality_id: number;
  contracting_situation_id: number;
  dispute_mode_id: number;
  legal_basic_id: number;
  number: string;
  year: number;
  process_number: string;
  goals: string;
  srp: boolean;
  additional_information: string | null;
  opening_date_proposal: string; // ISO Date
  closing_date_proposal: string; // ISO Date
  agency: {
    name: string;
    country_register: string;
  };
  unit: {
    id: string;
    name: string;
    code: string;
    city_code: number;
    agency_country_register: string;
  };
  applicability_normal_preference_margin: boolean | null;
  applicability_additional_preference_margin: boolean | null;
  normal_preference_margin: boolean | null;
  additional_preference_margin: boolean | null;
  normal_preference_margin_percentage: number | null;
  additional_preference_margin_percentage: number | null;
  ncm_nbs_code: string | null;
  ncm_nbs_description: string | null;
}
export interface LicitacaoItemModel {
  id: string;
  procurement_id: string;
  number: number;
  item_type: string;
  benefit_type_id: number;
  basic_productive_incentive: boolean;
  description: string;
  quantity: number;
  unit_of_measurement: string;
  estimated_unit_value: number;
  total_value: number;
  judging_criteria_id: number;
  confidential_budget: boolean;
  item_category_id: number;
  assets: any | null;
  real_estate_registry_code: string | null;
  contract_item_situation_id: number;
  applicability_normal_preference_margin: boolean;
  applicability_additional_preference_margin: boolean;
  normal_preference_margin_percentage: number | null;
  additional_preference_margin_percentage: number | null;
  ncm_nbs_code: string | null;
  ncm_nbs_description: string | null;
  results: Array<{
    id: string;
    procurement_item_id: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    person_type: string;
    supplier_ni: string;
    supplier_name_or_social_reason: string;
    supplier_size_id: number;
    legal_nature_id: string;
    country_code: string;
    subcontracting_indicator: boolean;
    srp_classification_order: number;
    date: string;
    discount_percentage: string;
    gateway_sequence: number;
    status: number;
    preference_margin_applicability: boolean;
    preference_margin_legal_basis: string | null;
    product_origin_country: string | null;
    benefit_me_epp_applicability: boolean;
    tiebreaker_criterion_applicability: boolean;
    tiebreaker_criterion_legal_basis: string | null;
    foreign_currency_symbol: string | null;
    foreign_currency_exchange_date: string;
    foreign_currency_timezone_offset: string | null;
    foreign_currency_nominal_value: number;
  }>;
}

export interface LicitacaoArquivos {
  id: string;
  kind: string;
  label: string;
  mime: string;
  size: string;
  extension: string;
  gateway_location: string;
  gateway_sequence: number;
  document_type_id: number;
  document_title: string;
}

export interface LicitacaoResultados {
  id: string;
  procurement_item_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  person_type: string;
  supplier_ni: string;
  supplier_name_or_social_reason: string;
  supplier_size_id: number;
  legal_nature_id: string;
  country_code: string;
  subcontracting_indicator: boolean;
  srp_classification_order: number;
  date: string;
  discount_percentage: string;
  gateway_sequence: number;
  status: number;
  preference_margin_applicability: boolean;
  preference_margin_legal_basis: string | null;
  product_origin_country: string | null;
  benefit_me_epp_applicability: boolean;
  tiebreaker_criterion_applicability: boolean;
  tiebreaker_criterion_legal_basis: string | null;
  foreign_currency_symbol: string | null;
  foreign_currency_exchange_date: string;
  foreign_currency_timezone_offset: string | null;
  foreign_currency_nominal_value: number;
}

export type RequisicaoLicitacaoModel = RequisicaoModel<LicitacaoModel[]>;