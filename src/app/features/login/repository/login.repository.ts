import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponse } from './../models/login.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { TenantService } from '../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRepository {

  constructor(private _http: HttpClient, private _tenantService: TenantService) {}

  login(form: LoginModel): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${environment.apiUrl}/tenants/${this._tenantService.getTenant()}/auth/login`, form);
  }
  logout(tenant:string): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${environment.apiUrl}/tenants/${tenant}/auth/logout`,null);
  }
}
