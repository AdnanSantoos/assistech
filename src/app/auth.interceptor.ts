import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptando requisição:', req.url);

  const excludedUrls = ['/home', '/login'];
  const isExcludedUrl = excludedUrls.some(url => req.url.includes(url));

  if (isExcludedUrl) {
    console.log(`Requisição para a URL ${req.url} não requer token.`);
    return next(req);
  }

  const token = localStorage.getItem('authToken');

  if (token) {
    console.log('Token encontrado e adicionado ao cabeçalho:', token);


    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });

    return next(cloned);
  } else {
    console.log('Nenhum token encontrado no localStorage.');
    return next(req);
  }
};
