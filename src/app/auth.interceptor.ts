import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

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
      console.log(err)
      if (err.status === 401) {
        // Redirecionar para a tela de login
        localStorage.removeItem('authToken'); // Limpar o token, se necessário
        localStorage.removeItem('isStaff');   
        router.navigate(['/adm/login'], {
          queryParams: { sessionExpired: true }, // Passar uma mensagem, opcional
        });
      }
      // Propagar o erro para tratamento adicional
      return throwError(() => err);
    })
  );
};
