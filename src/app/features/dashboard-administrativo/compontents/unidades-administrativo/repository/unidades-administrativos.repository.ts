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

  constructor(private _http: HttpClient) {}

  getUnidade(page: number): Observable<RequisicaoModel<UnidadeModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<UnidadeModel[]>>(this.baseUrl, { params });
  }
  createUnidade(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }
  
  
}
