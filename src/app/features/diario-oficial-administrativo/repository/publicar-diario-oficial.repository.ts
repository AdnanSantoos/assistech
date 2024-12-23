import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {
  PublicarDiarioOficialModel,
  PublicarDiarioOficialResponse,
} from './../models/publicar-diario-oficial.model';
import { TenantService } from '../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class PublicarDiarioOficialRepository {
  constructor(private _http: HttpClient, private _tenantService: TenantService) { }

  publicarDiarioOficial(form: FormData): Observable<PublicarDiarioOficialResponse> {
    return this._http.post<PublicarDiarioOficialResponse>(`${environment.apiUrl}/tenants/${this._tenantService.getTenant()}/diario-oficial/official-gazettes`, form)
  }
}
