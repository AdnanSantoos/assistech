import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { ClienteData } from '../../../model/cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteAdministrativoRepository {
  constructor(private _http: HttpClient) { }

  getClientes(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<ClienteData[]>>(`${environment.apiUrl}/staff/tenants`, { params });
  }

  createUser(clientData: ClienteData): Observable<ClienteData> {
    return this._http.post<ClienteData>(`${environment.apiUrl}/staff/tenants`, clientData);
  }

}
