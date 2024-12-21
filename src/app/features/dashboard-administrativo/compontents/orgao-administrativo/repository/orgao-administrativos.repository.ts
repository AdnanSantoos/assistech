import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { OrgaoModel, OrgaoResponse } from '../model/orgao-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class OrgaosRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/agencies`;

  constructor(private _http: HttpClient) { }

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, { params });
  }

  getOrgaoPorRegistro(countryRegister: string): Observable<{ data: OrgaoModel }> {
    const url = `${this.baseUrl}/${countryRegister}`;
    return this._http.get<{ data: OrgaoModel }>(url);
  }

  createOrgao(orgaoData: Pick<OrgaoModel, 'country_register'>): Observable<OrgaoModel> {
    return this._http.post<OrgaoModel>(this.baseUrl, orgaoData);
  }
  deleteOrgao(countryRegister: string): Observable<void> {
    const url = `${this.baseUrl}/${countryRegister}`;
    return this._http.delete<void>(url);
  }
  

}
