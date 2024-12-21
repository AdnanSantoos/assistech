import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RequisicaoContratoModel, ContratoModel, TermosContratosModel } from '../model/contratos-administrativo.model';
import { environment } from '../../../../../../environments/environment';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ContratosRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/contracts`;

  constructor(private _http: HttpClient) { }

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoContratoModel>(this.baseUrl, { params });
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }

  createTermoContrato(data: Partial<TermosContratosModel>): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms`;
    return this._http.post<void>(url, data);
  }

  getContratoById(id: string): Observable<RequisicaoModel<ContratoModel>> {
    return this._http.get<RequisicaoModel<ContratoModel>>(`${this.baseUrl}/${id}`);
  }

  deleteContrato(procurementId: string, justification: string): Observable<void> {
    const body = { justification };
    return this._http.delete<void>(`${this.baseUrl}/${procurementId}`, { body });
  }

  updateContrato(id: string, data: Partial<ContratoModel>): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/${id}`, data);
  }

  getContractFiles(contractId: string, page: number): Observable<any> {
    const url = `${this.baseUrl}/${contractId}/files`;
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<any>(url, { params });
  }

  getContractTerms(contractId: string, page: number): Observable<any> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms`;
    const params = new HttpParams()
      .set('contract_id', contractId)
      .set('page', page.toString());

    return this._http.get<any>(url, { params });
  }


  getTermoById(termoId: string): Observable<{ data: TermosContratosModel }> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termoId}`;
    return this._http.get<{ data: TermosContratosModel }>(url);
  }
  
  // Adicionar método para atualizar um termo existente
  updateTermoContrato(termoId: string, data: Partial<TermosContratosModel>): Observable<void> {
    const url = `${this.baseUrl}/terms/${termoId}`;
    return this._http.put<void>(url, data);
  }

}
