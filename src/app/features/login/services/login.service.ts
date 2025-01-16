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
  protected tenant!: string;
  constructor(
    private _repository: LoginRepository,
    private _router: Router,
    private _toastr: ToastrService,
    private _tenantService: TenantService
  ) {
    this._tenantService.state$.subscribe((tenantData) => {
      this.tenant = tenantData?.slug!;
    });
  }
  loading: boolean = false;

  getLoading() {
    return this.loading;
  }
  public login(form: LoginModel): void {
    this.loading = true;

    // Realiza a requisição de login
    this._repository.login(form).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;

        // Armazena o token no localStorage
        const token = response.data.token;
        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('email', form.email);
        }

        // Busca os dados do tenant após o login
        this._tenantService.getDados(this.tenant).subscribe({
          next: (v) => {
            // Armazena informações adicionais do usuário
            if (v.data.is_staff) {
              localStorage.setItem('userEmail', v.data.email);
              localStorage.setItem('isStaff', v.data.is_staff.toString());
            }

            // Armazena o slug do tenant no localStorage
            this._router.navigate([
              `/adm/dashboard-administrativo/home`,
            ]);
          },
          error: (err) => {
            this._toastr.error('Erro ao buscar os dados do tenant.', 'Erro!');
          },
        });
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
        localStorage.clear()
        this._tenantService.setSlug('')
        this._router.navigate([tenant+'/']);
      },
      error: (err: any) => {
        this._toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }
}
