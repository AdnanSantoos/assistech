export interface ExibirClienteData {
  agencies: any[];
  city: {
    code: number;
    label: string;
    state_code: number;
    uf: string;
  };
  city_name: string;
  name: string;
  pncp: boolean;
  portal_transparencia: boolean;
  diario_oficial: boolean;
  logo?: string;
  slug: string;
  state_uf: string;
  year: number;
  beginning_official_gazette?: number;
  domain?: string;
  previous_official_gazette_link?:string;
  previous_official_gazette_date?:string;
  next_edition_number?: number;
  government_body: string;
  is_active?: boolean;
  file_is_sent_signed: boolean;
  errors?: any;
  address: {
    street: string;
    number: string;
    complement?: string;
    district: string;
    zip: string;
  };
  networks: {
    youtube: string;
    facebook: string;
    instagram: string;
    tiktok: string;
  };
}
export interface ClienteData {
  agencies: any[];
  city: {
    code: number;
    label: string;
    state_code: number;
    uf: string;
  };
  city_name: string;
  name: string;
  pncp: boolean;
  portal_transparencia: boolean;
  diario_oficial: boolean;
  logo?: string;
  second_logo?: string;
  slug: string;
  state_uf: string;
  year: number;
  beginning_official_gazette?: number;
  domain?: string;
  next_edition_number?: number;
  government_body: string;
  is_active?: boolean;
  file_is_sent_signed: boolean;
  errors?: any;
  address: ClientAddressModel[];
  networks: ClientNetworkModel[];
}

export interface ClientAddressModel {
  street: string;
  number: string;
  complement?: string;
  district: string;
  zip: string;
}
export interface ClientNetworkModel {
  youtube: string;
  facebook: string;
  instagram: string;
  tiktok: string;
}
