import { RequisicaoModel } from "../../../../../shared/models/shared.model";

export type TipoOrgao = 'federal' | 'estadual' | 'municipal' | null;

export interface OrgaoUnitModel {
    id: string;
    name: string;
    code: string;
    city_code: number;
    agency_country_register: string;
}
export interface OrgaoResponse {
    data: OrgaoModel;
  }
export interface OrgaoModel {
    name: string;
    country_register: string;
    units: OrgaoUnitModel[];
    agency?: {
        name?: string;
        country_register?: string;
      };
}

export interface SelectedAgencies {
    country_register?:string;
    value: string;
    label: string;
    unit: OrgaoUnitModel[];
}

export type RequisicaoOrgaoModel = RequisicaoModel<OrgaoModel[]>;
