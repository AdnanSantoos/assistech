import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Noticia } from '../models/cadastrar-noticias.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiaRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/tenant-news`;

  constructor(private _http: HttpClient) { }

  criarNoticia(formData: FormData): Observable<Noticia> {
    return this._http.post<Noticia>(this.baseUrl, formData);
  }
  getNoticias(): Observable<Noticia[]> {
    return this._http.get<Noticia[]>(this.baseUrl);
  }
}
