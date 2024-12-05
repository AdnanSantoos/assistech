import { HttpClient } from '@angular/common/http';
import { LoginModel, LoginResponse } from './../models/login.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRepository {

  constructor(private _http: HttpClient) {}

  login(form: LoginModel): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${environment.apiUrl}/${environment.tenant}/auth/login`, form);
  }
  logout(tenant:string): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${environment.apiUrl}/${tenant}/auth/logout`,null);
  }
}
