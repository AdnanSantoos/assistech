import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { DashboardModel } from '../models/dashboard-home.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeRepository {
  constructor(private _http: HttpClient) {}
  
  getDashboard() {
    return this._http.get<RequisicaoModel<DashboardModel>>(`${environment.apiUrl}/tenants/${environment.tenant}/dashboard`);
  }

}
