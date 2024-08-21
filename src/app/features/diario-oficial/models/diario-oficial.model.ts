export interface DiarioOficialPublico {
    data: DadosDiarioOficialPublico;
}

export interface DadosDiarioOficialPublico {
    slug: string;
    domain: string;
    name: string;
    year: number;
    city_name: string;
    state_uf: string;
    first_publication: string;
}


