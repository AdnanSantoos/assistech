import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TenantService } from '../services/tenant.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const tenantService = inject(TenantService);

  // Lista de URLs excluídas do interceptor
  const excludedUrls = ['/home', '/login'];
  const isExcludedUrl = excludedUrls.some(url => req.url.includes(url));

  if (isExcludedUrl) {
    return next(req);
  }

  // Recuperar o token do localStorage
  const token = localStorage.getItem('authToken');

  // Clonar a requisição com o token, se disponível
  const cloned = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  // Passar a requisição para o próximo handler e capturar erros
  return next(cloned).pipe(
    catchError(err => {
      toastr.error(err.error.message);
      if (err.status === 401) {
        // Recuperar o slug do tenant atual
        const slug = tenantService.getTenant(); // Use o método getTenant do TenantService

        // Redirecionar para a tela de login com o slug do tenant
        localStorage.removeItem('authToken'); // Limpar o token, se necessário
        localStorage.removeItem('isStaff');
        router.navigate([`/${slug}/adm/login`], {
          queryParams: { sessionExpired: true }, // Passar uma mensagem, opcional
        });
      }
      // Propagar o erro para tratamento adicional
      return throwError(() => err);
    })
  );
};
