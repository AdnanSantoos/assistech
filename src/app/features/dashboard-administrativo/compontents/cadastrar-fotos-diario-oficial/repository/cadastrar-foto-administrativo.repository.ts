import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class CadastrarFotosAdministrativoRepository {
  constructor(private _http: HttpClient, private _tenantService : TenantService) { }

  CadastrarFoto(photoData: FormData): Observable<any> {
    const url = `${environment.apiUrl}/tenants/${this._tenantService.getTenant()}/diario-oficial/photos`;
    return this._http.post<any>(url, photoData);
  }

  uploadLogo(logoData: FormData): Observable<void> {
    const url = `${environment.apiUrl}/staff/tenants/${this._tenantService.getTenant()}/logo`;
    return this._http.post<void>(url, logoData);
  }

}
