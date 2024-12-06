import { Router } from '@angular/router';
import { LoginRepository } from '../repository/login.repository';
import { LoginModel } from './../models/login.model';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from './../models/login.model';
import { TenantService } from '../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  protected tenant! :string;
  constructor(
    private _repository: LoginRepository,
    private _router: Router,
    private _toastr: ToastrService,
    private _tenantService: TenantService
  ) {
    this._tenantService.state$.subscribe(tenantData => {
      this.tenant = tenantData?.slug!;
    })
  }
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
        this._tenantService.getDados(this.tenant).subscribe(v=>{
          if(v.data.is_staff){
            localStorage.setItem('isStaff',v.data.is_staff) 
          }
          this._router.navigate(['adm/dashboard-administrativo/home']);  
        })
      },
      error: (err: any) => {
        this.loading = false;
        this._toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }

  public logout(tenant: string) {
    this._repository.logout(tenant).subscribe({
      next: (response: LoginResponse) => {
        localStorage.removeItem('authToken');    
        localStorage.removeItem('isStaff');    
        this._router.navigate(['/']);
      },
      error: (err: any) => {
        this._toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }
}
