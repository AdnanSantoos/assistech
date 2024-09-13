import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const excludedUrls = ['/home', '/login'];
  const isExcludedUrl = excludedUrls.some(url => req.url.includes(url));

  if (isExcludedUrl) {
    return next(req);
  }

  const token = localStorage.getItem('authToken');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  } else {
    return next(req);
  }
};
