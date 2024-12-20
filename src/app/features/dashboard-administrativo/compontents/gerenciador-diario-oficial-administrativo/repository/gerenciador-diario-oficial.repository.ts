import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { DiarioOficialPublicacoes } from '../models/gerenciador-diario-oficial.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GerenciadorDiarioOficialRepository {

  constructor(private _http: HttpClient) { }

  getListaDiarioOficial(page: number) {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<DiarioOficialPublicacoes[]>>(`${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes`, { params });
  }

  onDeleteItem(id: string): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes/${id}`;
    return this._http.delete<void>(url);
  }

  onDeletePages(id: string, pages: number[]): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes/${id}/remove-pages`;
    return this._http.put<void>(url, { pages });
  }
  
  getDocumentPages(id: string): Observable<{ data: { pages: number; file_upload: string } }> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes/${id}/pages`;
    console.log('URL da requisição de páginas:', url);
    return this._http.get<{ data: { pages: number; file_upload: string } }>(url);
  }
  
  attachDocument(id: string, file: File): Observable<{ data: { status: boolean } }> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/diario-oficial/official-gazettes/${id}/attach`;

    const formData = new FormData();
    formData.append('file', file);

    return this._http.post<{ data: { status: boolean } }>(url, formData);
  }
}
