export interface PublicarDiarioOficialModel {
  ataDaSessao: string;
  day: string;
  month: string;
  year: string;
  file: File;
}

export interface PublicarDiarioOficialResponse {
  success: boolean;
  message: string;
}
