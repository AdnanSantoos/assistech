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
            const tenantSlug = v.data.slug || v.meta?.tenant?.slug;
            if (tenantSlug) {
              localStorage.setItem('tenantSlug', tenantSlug);

              // Redireciona para a rota com o slug do tenant
              this._router.navigate([
                `${tenantSlug}/adm/dashboard-administrativo/home`,
              ]);
            } else {
              this._toastr.error('Slug do tenant não encontrado.', 'Erro!');
            }
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isStaff');
        this._router.navigate(['/']);
      },
      error: (err: any) => {
        this._toastr.error(err.error.message, 'Ocorreu um erro!');
      },
    });
  }
}
