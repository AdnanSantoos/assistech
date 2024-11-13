import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Noticia } from '../models/cadastrar-noticias.model';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoticiaRepository {
  private baseUrl = `${environment.apiUrl}/v1/tenants/${environment.tenant}/diario-oficial/tenant-news`;

  constructor(private _http: HttpClient) {}

  listarNoticiasPorFiltro(filtro?: { titulo?: string; dataInicio?: string; dataFim?: string }) {
    let queryParams = new HttpParams();
    if (filtro) {
      if (filtro.titulo) {
        queryParams = queryParams.append('titulo', filtro.titulo);
      }
      if (filtro.dataInicio) {
        queryParams = queryParams.append('dataInicio', filtro.dataInicio);
      }
      if (filtro.dataFim) {
        queryParams = queryParams.append('dataFim', filtro.dataFim);
      }
    }

    return this._http.get<RequisicaoModel<Noticia[]>>(this.baseUrl, { params: queryParams });
  }

  criarNoticia(noticia: Noticia) {
    return this._http.post<RequisicaoModel<Noticia>>(this.baseUrl, noticia);
  }

  atualizarNoticia(newsId: number, noticia: Noticia) {
    return this._http.put<RequisicaoModel<Noticia>>(`${this.baseUrl}/${newsId}`, noticia);
  }

  excluirNoticia(newsId: number) {
    return this._http.delete(`${this.baseUrl}/${newsId}`);
  }

  criarNoticiaComImagem(formData: FormData): Observable<Noticia> {
    return this._http.post<Noticia>(`${this.baseUrl}`, formData);
  }
}
