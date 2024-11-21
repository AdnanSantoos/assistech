export type TipoRota = 'adm' | 'trn' | null;

export interface selectModel {
    key: string;
    value: number;
}


export interface RequisicaoModel<T> {
    data: T;
    meta?: {
        links: LinksModel,
        pagination: PaginationModel,
        tenant: TenantModel,
    }
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

export interface TenantModel {
    city_name: string;
    name: string;
    slug: string;
    state_uf: string;
    year: number;

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
    logo?: string;
}

export interface TenantFullModel extends TenantModel {
    domain: string;
    first_publication: string;
    country_register: string;
    phone: string;
    networks: TenantNetworkModel;
    address: TenantAddressModel;
}

export type RequisicaoTenantFullModel = RequisicaoModel<TenantFullModel>;
