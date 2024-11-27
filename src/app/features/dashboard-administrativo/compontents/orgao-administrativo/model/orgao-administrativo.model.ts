import { RequisicaoModel } from "../../../../../shared/models/shared.model";

export type TipoOrgao = 'federal' | 'estadual' | 'municipal' | null;

export interface OrgaoUnitModel {
    id: string;
    name: string;
    code: string;
    city_code: number;
    agency_country_register: string;
}

export interface OrgaoModel {
    name: string;
    country_register: string;
    units: OrgaoUnitModel[];
}

export type RequisicaoOrgaoModel = RequisicaoModel<OrgaoModel[]>;
