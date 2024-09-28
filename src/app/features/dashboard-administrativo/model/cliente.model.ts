export interface ClienteData {
  nome: string;
  cidade: string;
  pncp: boolean | string;
  portalTransparencia:  boolean | string;
  diarioOficial:  boolean | string;
  anoInicial?: string;
  proximaEdicao?: string;
  dominio?: string;
  tipo: string;
  status:  boolean | string;
}
