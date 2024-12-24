import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Noticia } from '../models/cadastrar-noticias.model';
import { Observable } from 'rxjs';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class NoticiaRepository {
  private readonly baseUrl = `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/diario-oficial/tenant-news`;

  constructor(private _http: HttpClient, private _tenantService:TenantService) { }

  criarNoticia(formData: FormData): Observable<Noticia> {
    return this._http.post<Noticia>(this.baseUrl, formData);
  }
  getNoticias(): Observable<Noticia[]> {
    return this._http.get<Noticia[]>(this.baseUrl);
  }
}
