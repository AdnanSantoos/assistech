export interface DiarioOficialPesquisaData {
    year: number | null;
    month:number | null;
    //palavra-chave
    content:string | null;
    //edicao
    number:number | null;
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
    previous_official_gazette_link?:string;
    previous_official_gazette_date?:string;
}


