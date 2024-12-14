import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { LicitacaoModel, LicitacaoDetalhesModel, LicitacaoItemModel, LicitacaoArquivos, LicitacaoResultados } from '../model/licitacoes-administrativo.model';
import { LicitacoesRepository } from '../repository/licitacoes-administrativos.repository';
import { OrgaoModel } from '../../orgao-administrativo/model/orgao-administrativo.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService {
  constructor(private _repository: LicitacoesRepository) { }

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    return this._repository.getLicitacoes(page);
  }

  getLicitacoesDetalhes(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoDetalhesModel[]>> {
    return this._repository.getLicitacoesDetalhes(licitacaoId, page);
  }

  getLicitacoesItens(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoItemModel[]>> {
    return this._repository.getLicitacoesItens(licitacaoId, page);
  }

  getLicitacoesArquivos(tenant: string, procurementId: string, page: number): Observable<RequisicaoModel<LicitacaoArquivos[]>> {
    return this._repository.getLicitacoesArquivos(tenant, procurementId, page);
  }

  getLicitacaoAtas(licitacaoId: string, page: number): Observable<RequisicaoModel<any>> {
    return this._repository.getLicitacaoAtas(licitacaoId, page);
  }

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._repository.getOrgaos(page);
  }

  getLicitacaoById(id: string): Observable<RequisicaoModel<LicitacaoDetalhesModel>> {
    return this._repository.getLicitacaoById(id);
  }

  createLicitacoes(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._repository.createLicitacoes(data);
  }

  updateLicitacao(id: string, data: any): Observable<void> {
    return this._repository.updateLicitacao(id, data);
  }

  getResultadosItem(procurementId: string, itemId: string): Observable<RequisicaoModel<LicitacaoResultados[]>> {
    return this._repository.getResultadosItem(procurementId, itemId);
  }


  deleteResultado() {

  }

  deleteLicitacao(procurementId: string, justification: string): Observable<void> {
    return this._repository.deleteLicitacao(procurementId, justification);
  }


}
