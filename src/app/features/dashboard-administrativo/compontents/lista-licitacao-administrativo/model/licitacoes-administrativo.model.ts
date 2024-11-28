import { RequisicaoModel } from "../../../../../shared/models/shared.model";
import { AgenciaModel, UnidadeModel } from "../../unidades-administrativo/model/unidades-administrativo.model";

export interface LicitacaoModel {
  id: string;
  number: string;
  process_number: string;
  year: number;
  gateway_sequence: number;
  created_at: string; // Data em formato ISO
  agency: AgenciaModel; // Relacionamento com Agência
  unit: UnidadeModel;  // Relacionamento com Unidade
  imported: boolean;
}

export type RequisicaoLicitacaoModel = RequisicaoModel<LicitacaoModel[]>;