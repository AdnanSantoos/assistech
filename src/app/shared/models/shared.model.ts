export type TipoRota = 'adm' | 'trn' | null;

export interface selectModel {
  key: string;
  value: number | string;
}

export interface RequisicaoModel<T> {
  data: T;
  meta?: {
    tenant?: TenantFullModel; // Adicionado o campo tenant como opcional
    links: LinksModel;
    pagination: PaginationModel;
    permissions?:any;
  };
}

export interface PaginationModel {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export interface LinksModel {
  first_page_url: string;
  last_page_url: string;
  next_page_url: string;
  path: string;
  prev_page_url: string;
}
export interface TenantNetworkModel {
  youtube: string;
  facebook: string;
  instagram: string;
  tiktok: string;
}

export interface TenantAddressModel {
  street: string;
  number: string;
  complement?: string;
  district: string;
  zip: string;
}

export interface TenantFullModel {
  domain: string;
  first_publication: string;
  country_register: string;
  phone: string;
  logo: string;
  networks: TenantNetworkModel;
  address: TenantAddressModel;
  city_name: string;
  name: string;
  slug: string;
  state_uf: string;
  year: number;
  permissions:any;
  second_logo?: string;
  previous_official_gazette_link?:string;
previous_transparent_link?:string;
  previous_official_gazette_date?:string;
  is_active?:boolean;
}

export interface dynamicFields {
  name: string;
  type: string;
  label: string;
  required: boolean;
  value?: any;
  disabled?: boolean;
  fileType?: string;
  placeholder?: string;
  accept?: string;
  nameButton?: string;
  title?: string;
  page?: string;
  options?: [{ value: string; label: string }];
}

export type RequisicaoTenantFullModel = RequisicaoModel<TenantFullModel>;
