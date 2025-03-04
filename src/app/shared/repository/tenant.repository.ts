import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TenantService } from '../services/tenant.service';


@Injectable({
  providedIn: 'root'
})
export class TenantRepository {
  constructor(private tenantService: TenantService) {}

  fetchTenant(tenant: string = ''): Observable<any> {
    return this.tenantService.getTenantData(tenant);
  }
}
