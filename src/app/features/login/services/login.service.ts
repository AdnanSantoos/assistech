import { Router } from '@angular/router';
import { LoginRepository } from '../repository/login.repository';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private _repository: LoginRepository,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  public login(form: LoginModel) {
    this._repository.login(form).subscribe({
      next: (data) => {
        this._router.navigate(['/menu-administrativo']);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }
}
