import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { DashboardModel } from '../models/dashboard-home.model';
import { environment } from '../../../../../../environments/environment';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeRepository {
  constructor(private _http: HttpClient, private _tenantService: TenantService) {}
  
  getDashboard() {
    return this._http.get<RequisicaoModel<DashboardModel>>(`${environment.API_URL}/tenants/${this._tenantService.getTenant()}/dashboard`);
  }

}
