import { HttpClient } from '@angular/common/http';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginRepository {

  constructor( private _http:HttpClient) {}

  login(form:LoginModel){
    return this._http.post(`${environment.apiUrl}/${environment.tenant}/auth/login`,form)
  }
}
