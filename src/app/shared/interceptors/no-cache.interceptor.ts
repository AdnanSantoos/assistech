import { HttpInterceptorFn } from '@angular/common/http';

export const noCacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone a requisição original e adicione os cabeçalhos para evitar cache
  const noCacheReq = req.clone({
    setHeaders: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });

  // Continue com a requisição modificada
  return next(noCacheReq);
};