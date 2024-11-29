import { RequisicaoModel } from "../../../../../shared/models/shared.model";
import { LicitacaoDetalhesModel } from "../../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/model/licitacoes-administrativo.model";

export interface ContratoModel {
  id: string;
  number: string; 
  process: string;
  year: number;
  initial_value: number;
  global_value: number; 
  accumulated_value: number; 
  installment_value: number;
  number_of_installments: number;
  start_date: string; 
  end_date: string;
  signature_date: string; 
  goals: string; 
  additional_information: string | null; 
  change_reason: string | null; 
  cipi_identifier: string | null;
  cipi_url: string | null;
  contract_type_id: number;
  process_category_id: number;
  procurement_id: string;
  procurement: LicitacaoDetalhesModel;
  supplier_id: string;
  supplier_name: string; 
  supplier_person_type: string; 
  revenue: boolean; 
  created_at: string;
  created_by_id: string;
  gateway_sequence: number; 
  subcontracted_supplier_id: string | null; 
  subcontracted_supplier_name: string | null; 
  subcontracted_supplier_person_type: string | null;
  subrogated_organization_code: string | null; 
  subrogated_organization_country_register: string | null; 
}

export type RequisicaoContratoModel = RequisicaoModel<ContratoModel[]>;
