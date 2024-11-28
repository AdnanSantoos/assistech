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

export type RequisicaoLicitacaoModel = RequisicaoModel<LicitacaoModel[]>;