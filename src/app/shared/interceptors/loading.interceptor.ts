import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Ativar o loading antes da requisição
  loadingService.setLoading(true);

  // Continuar a requisição e desativar o loading no final
  return next(req).pipe(
    finalize(() => {
      loadingService.setLoading(false);
    })
  );
};
