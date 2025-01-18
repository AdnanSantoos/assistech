import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import {
  LicitacaoModel,
  LicitacaoDetalhesModel,
  LicitacaoItemModel,
  LicitacaoArquivos,
  LicitacaoResultados,
  LicitacaoAtaModel,
  LicitacaoAtaExtendedResponse,
} from '../model/licitacoes-administrativo.model';
import { OrgaoModel } from '../../orgao-administrativo/model/orgao-administrativo.model';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesRepository {
  private get baseUrl() {
    return `${
    environment.API_URL
  }/tenants/${this._tenantService.getTenant()}/pncp/procurements`;
  }

  constructor(
    private _http: HttpClient,
    private _tenantService: TenantService
  ) {}

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<LicitacaoModel[]>>(
      `${this.baseUrl}`,
      { params }
    );
  }

  getLicitacoesWithFilters(
    params: HttpParams
  ): Observable<RequisicaoModel<LicitacaoModel[]>> {
    return this._http.get<RequisicaoModel<LicitacaoModel[]>>(
      `${this.baseUrl}`,
      { params }
    );
  }

  getLicitacoesDetalhes(
    id: string,
    page: number
  ): Observable<RequisicaoModel<LicitacaoDetalhesModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${id}/items`;
    return this._http.get<RequisicaoModel<LicitacaoDetalhesModel[]>>(url, {
      params,
    });
  }

  getLicitacoesArquivos(
    tenant: string,
    procurementId: string,
    page: number
  ): Observable<RequisicaoModel<LicitacaoArquivos[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/procurements/${procurementId}/files`;
    return this._http.get<RequisicaoModel<LicitacaoArquivos[]>>(url, {
      params,
    });
  }

  getLicitacoesItens(
    licitacaoId: string,
    page: number
  ): Observable<RequisicaoModel<LicitacaoItemModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${licitacaoId}/items`;
    return this._http.get<RequisicaoModel<LicitacaoItemModel[]>>(url, {
      params,
    });
  }

  getLicitacaoAtas(
    licitacaoId: string,
    page: number
  ): Observable<LicitacaoAtaExtendedResponse> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${this.baseUrl}/${licitacaoId}/minutes`;

    return this._http.get<LicitacaoAtaExtendedResponse>(url, { params });
  }
  getAtaArquivos(
    minutesId: string,
    page: number
  ): Observable<RequisicaoModel<LicitacaoArquivos>> {
    const params = new HttpParams().set('page', page.toString());
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/minutes/${minutesId}/files`;
    return this._http.get<RequisicaoModel<any>>(url, { params });
  }
  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, {
      params,
    });
  }

  getOrgaosAtualizado(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/agencies`;
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(url, { params });
  }

  getLicitacaoById(
    id: string
  ): Observable<RequisicaoModel<LicitacaoDetalhesModel>> {
    return this._http.get<RequisicaoModel<LicitacaoDetalhesModel>>(
      `${this.baseUrl}/${id}`
    );
  }

  createLicitacoes(data: {
    agency: string;
    agency_country_register: string;
  }): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }

  createLicitacaoItem(
    procurementId: string,
    data: LicitacaoItemModel
  ): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/items`;
    return this._http.post<void>(url, data);
  }
  updateLicitacaoItem(
    procurementId: string,
    itemId: string,
    data: any
  ): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/items/${itemId}`;
    return this._http.put<void>(url, data);
  }

  createArquivoLicitacao(
    tenant: string,
    procurementId: string,
    fileData: FormData
  ): Observable<LicitacaoArquivos> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/procurements/${procurementId}/files`;
    return this._http.post<LicitacaoArquivos>(url, fileData);
  }

  createLicitacaoAta(
    procurementId: string,
    ataData: FormData
  ): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/minutes`;
    return this._http.post<void>(url, ataData);
  }
  uploadArquivo(
    minutesId: string,
    formData: FormData
  ): Observable<LicitacaoArquivos> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/minutes/${minutesId}/files`;
    return this._http.post<LicitacaoArquivos>(url, formData);
  }
  updateLicitacao(id: string, data: any): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/${id}`, data);
  }
  updateLicitacaoAta(
    procurementId: string,
    minutesId: string,
    ataData: FormData
  ): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/minutes/${minutesId}`;
    return this._http.put<void>(url, ataData);
  }

  getResultadosItem(
    procurementId: string,
    itemId: string
  ): Observable<RequisicaoModel<LicitacaoResultados[]>> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/procurements/${procurementId}/items/${itemId}/results`;
    return this._http.get<RequisicaoModel<LicitacaoResultados[]>>(url);
  }

  adicionarResultados(
    procurementId: string,
    itemId: string,
    data: any
  ): Observable<any> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/procurements/${procurementId}/items/${itemId}/results`;
    return this._http.post<any>(url, data);
  }

  updateResultado(
    procurementId: string,
    itemId: string,
    resultId: string,
    data: any
  ): Observable<any> {
    const url = `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/pncp/procurements/${procurementId}/items/${itemId}/results/${resultId}`;
    return this._http.put<any>(url, data);
  }

  deleteLicitacao(
    procurementId: string,
    justification: string
  ): Observable<void> {
    const body = { justification }; // Corpo com o motivo da exclusão
    return this._http.delete<void>(`${this.baseUrl}/${procurementId}`, {
      body,
    });
  }

  deleteAta(minutesId: string, justification: string): Observable<void> {
    const params = new HttpParams().set('justification', justification);
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/minutes/${minutesId}`;
    return this._http.delete<void>(url, { params });
  }

  deleteArquivos(
    tenant: string,
    minutesId: string,
    fileId: string,
    justification: string
  ): Observable<void> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/procurements/${minutesId}/files/${fileId}`;
    const params = { justification }; // Payload enviado como parâmetro
    return this._http.delete<void>(url, { params });
  }

  deleteAtasArquivo(
    minutesId: string,
    fileId: string,
    justification: string
  ): Observable<void> {
    const url = `${
      environment.API_URL
    }/tenants/${this._tenantService.getTenant()}/pncp/minutes/${minutesId}/files/${fileId}`;
    return this._http.delete<void>(url, {
      params: { justification },
    });
  }

  cancelarAta(
    procurementId: string,
    minutesId: string,
    payload: any
  ): Observable<void> {
    const url = `${this.baseUrl}/${procurementId}/minutes/${minutesId}/cancel`;
    return this._http.put<void>(url, payload);
  }
}
