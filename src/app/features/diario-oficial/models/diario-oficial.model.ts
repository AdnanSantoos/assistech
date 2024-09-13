export interface DiarioOficialPublico {
    data: DadosDiarioOficialPublico;
}

export interface DiarioOficialPesquisaData {
    year: number;
    month:number;
    content:string;
}

export interface DiarioOficalLista {
    date:string;
    description:string;
    file_published:string;
    number:number;
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


