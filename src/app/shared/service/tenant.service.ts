import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { TenantMapper } from '../mapper/tenant.mapper';
import { RequisicaoTenantFullModel, TenantModel } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private baseUrl = `${environment.apiUrl}/public/tenants`;

  constructor(private http: HttpClient, private tenantMapper: TenantMapper) {}

  getTenantData(tenant: string = environment.tenant): Observable<TenantModel> {
    return this.http
      .get<RequisicaoTenantFullModel>(`${this.baseUrl}/${tenant}`)
      .pipe(
        map(response => {
          const mappedTenant = this.tenantMapper.mapToTenant(response.data);
          return mappedTenant;
        })
      );
  }
}
