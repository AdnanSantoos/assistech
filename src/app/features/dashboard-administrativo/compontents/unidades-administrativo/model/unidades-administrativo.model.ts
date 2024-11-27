import { RequisicaoModel } from "../../../../../shared/models/shared.model";

export interface AgenciaModel {
  name: string;
  country_register: string;
}

export interface UnidadeModel {
  id: string;
  name: string;
  code: string;
  city_code: number;
  agency_country_register: string;
  agency: AgenciaModel;
}

export type RequisicaoUnidadeModel = RequisicaoModel<UnidadeModel[]>;
