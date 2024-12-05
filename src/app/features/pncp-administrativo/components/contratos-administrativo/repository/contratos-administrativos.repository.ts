import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoContratoModel, ContratoModel } from '../model/contratos-administrativo.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContratosRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/contracts`;

  constructor(private _http: HttpClient) {}

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoContratoModel>(this.baseUrl, { params });
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }

  getContratoById(id: string): Observable<ContratoModel> {
    return this._http.get<ContratoModel>(`${this.baseUrl}/${id}`);
  }
}
