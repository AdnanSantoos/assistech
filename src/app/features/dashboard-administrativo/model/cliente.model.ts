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
  permissions: {
    pncp: boolean;
    portal_transparencia: boolean;
    diario_oficial: boolean;
    logo?: string;
  };
  slug: string;
  state_uf: string;
  year: number;
  beginning_official_gazette?: number;
  domain?: string;
  next_edition_number?: number;
  government_body: string;
}

