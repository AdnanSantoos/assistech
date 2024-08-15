import { Router } from '@angular/router';
import { LoginRepository } from '../repository/login.repository';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _repository:LoginRepository,private _router: Router) {}

  public login(form:LoginModel){
    this._repository.login(form).subscribe(()=>{
      this._router.navigate(['/menu-administrativo']);
    })
  }
}
