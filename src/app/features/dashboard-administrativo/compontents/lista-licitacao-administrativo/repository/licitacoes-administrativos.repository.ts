import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { LicitacaoModel, LicitacaoDetalhesModel, LicitacaoItemModel, LicitacaoArquivos } from '../model/licitacoes-administrativo.model';
import { OrgaoModel } from '../../orgao-administrativo/model/orgao-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/procurements`;

  constructor(private _http: HttpClient) {}

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<LicitacaoModel[]>>(`${this.baseUrl}`, { params });
  }

  getLicitacoesDetalhes(id: string, page: number): Observable<RequisicaoModel<LicitacaoDetalhesModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${id}/items`;
    return this._http.get<RequisicaoModel<LicitacaoDetalhesModel[]>>(url, { params });
  }

  getLicitacoesArquivos(id: string, page: number): Observable<RequisicaoModel<LicitacaoArquivos[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${id}/files`;
    return this._http.get<RequisicaoModel<LicitacaoArquivos[]>>(url, { params });
  }
  
  getLicitacoesItens(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoItemModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${licitacaoId}/items`;
    return this._http.get<RequisicaoModel<LicitacaoItemModel[]>>(url, { params });
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

  updateLicitacao(id: string, data: any): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/${id}`, data);
  }
}
