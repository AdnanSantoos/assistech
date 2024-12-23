import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { ClienteData } from '../../../model/cliente.model';
import { Observable } from 'rxjs';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteAdministrativoRepository {
  constructor(private _http: HttpClient, private _tenantService: TenantService) { }

  getClientes(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<ClienteData[]>>(`${environment.apiUrl}/staff/tenants`, { params });
  }

  createUser(clientData: ClienteData): Observable<ClienteData> {
    return this._http.post<ClienteData>(`${environment.apiUrl}/staff/tenants`, clientData);
  }

  searchCities(label: string): Observable<any> {
    const params = new HttpParams().set('label', label);
    const url = `${environment.apiUrl}/${this._tenantService.getTenant()}/cities`;
    return this._http.get(url, { params });
  }
  getClienteBySlug(slug: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/staff/tenants/${slug}`);
  }

  updateCliente(slug: string, data: any): Observable<void> {
    return this._http.put<void>(`${environment.apiUrl}/staff/tenants/${slug}`, data);
  }


  
}
