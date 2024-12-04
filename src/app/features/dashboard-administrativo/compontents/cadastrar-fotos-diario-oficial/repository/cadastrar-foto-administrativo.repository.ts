import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteAdministrativoRepository {
  constructor(private _http: HttpClient) {}

  CadastrarFoto(tenant: string, photoData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/v1/tenants/${environment.tenant}/diario-oficial/photos`;
    return this._http.post<any>(url, photoData);
  }
}
