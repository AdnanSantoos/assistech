import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { UnidadeModel } from '../model/unidades-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadesRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/units?agency_country_register=`;

  constructor(private _http: HttpClient) { }

  getUnidade(page: number): Observable<RequisicaoModel<UnidadeModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<UnidadeModel[]>>(this.baseUrl, { params });
  }
  createUnidade(data: {
    agency_country_register: string;
    code: string;
    name: string;
    city_code: number;
  }): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }
  getCidades(label: string): Observable<{ data: Array<{ code: string; label: string }> }> {
    const params = new HttpParams().set('label', label);
    return this._http.get<{ data: Array<{ code: string; label: string }> }>(
      `${environment.apiUrl}/tenants/${environment.tenant}/cities`,
      { params }
    );
  }

  deleteUnidade(unitId: string): Observable<void> {
    const url = `${environment.apiUrl}/staff/tenants/${environment.tenant}/units/${unitId}`;
    return this._http.delete<void>(url);
  }
}
