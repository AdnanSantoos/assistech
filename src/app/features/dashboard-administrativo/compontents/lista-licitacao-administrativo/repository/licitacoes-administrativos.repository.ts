import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { LicitacaoModel, LicitacaoDetalhesModel, LicitacaoItemModel, LicitacaoArquivos, LicitacaoResultados } from '../model/licitacoes-administrativo.model';
import { OrgaoModel } from '../../orgao-administrativo/model/orgao-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/procurements`;

  constructor(private _http: HttpClient) { }

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<LicitacaoModel[]>>(`${this.baseUrl}`, { params });
  }

  getLicitacoesDetalhes(id: string, page: number): Observable<RequisicaoModel<LicitacaoDetalhesModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${id}/items`;
    return this._http.get<RequisicaoModel<LicitacaoDetalhesModel[]>>(url, { params });
  }

  getLicitacoesArquivos(tenant: string, procurementId: string, page: number): Observable<RequisicaoModel<LicitacaoArquivos[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/procurements/${procurementId}/files`;
    return this._http.get<RequisicaoModel<LicitacaoArquivos[]>>(url, { params });
  }

  getLicitacoesItens(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoItemModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${licitacaoId}/items`;
    return this._http.get<RequisicaoModel<LicitacaoItemModel[]>>(url, { params });
  }

  getLicitacaoAtas(licitacaoId: string, page: number): Observable<RequisicaoModel<any>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${licitacaoId}/minutes`;
    return this._http.get<RequisicaoModel<any>>(url, { params });
  }

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, { params });
  }

  getLicitacaoById(id: string): Observable<RequisicaoModel<LicitacaoDetalhesModel>> {
    return this._http.get<RequisicaoModel<LicitacaoDetalhesModel>>(`${this.baseUrl}/${id}`);
  }

  createLicitacoes(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }
  createLicitacaoItem(procurementId: string, data: LicitacaoItemModel): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/items`;
    return this._http.post<void>(url, data);
  }
  updateLicitacao(id: string, data: any): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/${id}`, data);
  }

  getResultadosItem(procurementId: string, itemId: string): Observable<RequisicaoModel<LicitacaoResultados[]>> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/procurements/${procurementId}/items/${itemId}/results`;
    return this._http.get<RequisicaoModel<LicitacaoResultados[]>>(url);
  }

  deleteLicitacao(procurementId: string, justification: string): Observable<void> {
    const body = { justification }; // Corpo com o motivo da exclusão
    return this._http.delete<void>(`${this.baseUrl}/${procurementId}`, { body });
  }

}
