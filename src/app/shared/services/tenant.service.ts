import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RequisicaoModel, RequisicaoTenantFullModel, TenantFullModel } from '../models/shared.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private _baseUrl = `${environment.apiUrl}/public/tenants`;
  private _tenantState = new BehaviorSubject<TenantFullModel|null>(null)
  public state$ = this._tenantState.asObservable();

  constructor(private http: HttpClient) {}

  getTenantData(tenant: string): Observable<RequisicaoModel<TenantFullModel>> {
    return this.http.get<RequisicaoModel<TenantFullModel>>(`${this._baseUrl}/${tenant}`);
  }
  updateState(newState:TenantFullModel){
    this._tenantState.next(newState)
  }

}