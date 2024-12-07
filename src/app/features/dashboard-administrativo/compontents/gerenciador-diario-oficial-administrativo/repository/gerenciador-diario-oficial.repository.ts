import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { DiarioOficialPublicacoes } from '../models/gerenciador-diario-oficial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GerenciadorDiarioOficialRepository {
  
  constructor(private _http: HttpClient) { }

  getListaDiarioOficial(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<DiarioOficialPublicacoes[]>>(`${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes`, { params });
  }

  onDeleteItem(id: string): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes/${id}`;
    return this._http.delete<void>(url);
  }
}
