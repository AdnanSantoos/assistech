export interface DiarioOficialPublicacoes {
  date: string;
  description: string;
  file_name: string;
  file_published: string;
  file_upload: string;
  id: string;
  number: number;
  protocol: string;
  status: string;
  year: number;
  year_label: string;
  audio_url?: string;
}

export interface DashboardCategorias {
  nome: string;
  quantidade: number;
}

export enum StatusPublicacao {
  PENDING = 'pending',
  SCHEDULED = 'scheduled',
  GENERATED_INDEX = 'generated_index',
  GENERATED_PDF = 'generated_pdf',
  SIGNED_PDF = 'signed_pdf',
  JOINING_FILES = 'joining_files',
  ERROR = 'error',
  PUBLISHED = 'published',
}
