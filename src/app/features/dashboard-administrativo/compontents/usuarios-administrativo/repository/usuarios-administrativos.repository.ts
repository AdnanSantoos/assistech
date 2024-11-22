import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { UsuarioData } from '../../../model/usuarios.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosRepository {
  constructor(private http: HttpClient) {}

  getUsuarios(page: number): Observable<RequisicaoModel<UsuarioData[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<RequisicaoModel<UsuarioData[]>>(`${environment.apiUrl}/staff/users`, { params });
  }

  createUser (userData: UsuarioData): Observable<UsuarioData> {
    return this.http.post<UsuarioData>(`${environment.apiUrl}/staff/users`, userData);
  }
}