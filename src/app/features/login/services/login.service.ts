import { Router } from '@angular/router';
import { LoginRepository } from '../repository/login.repository';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from './../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private _repository: LoginRepository,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  loading:boolean = false;

  getLoading(){
    return this.loading;
  }

  public login(form: LoginModel) {
    this.loading = true;
    this._repository.login(form).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;
        const token = response.data.token;
        if (token) {
          localStorage.setItem('authToken', token);
        }
        this._router.navigate(['adm/dashboard-administrativo/home']);
      },
      error: (err: any) => {
        this.loading = false;
        this._toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }
}
