import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { UsuarioData } from '../../../model/usuarios.model';
import { environment } from '../../../../../../environments/environment';
import { ClienteData } from '../../../model/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosRepository {
  constructor(private _http: HttpClient) { }

  getUsuarios(page: number): Observable<RequisicaoModel<UsuarioData[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<UsuarioData[]>>(`${environment.apiUrl}/staff/users`, { params });
  }

  createUser(userData: UsuarioData): Observable<UsuarioData> {
    return this._http.post<UsuarioData>(`${environment.apiUrl}/staff/users`, userData);
  }

  getClientes(name: string) {
    const params = new HttpParams().set('name', name);
    return this._http.get<RequisicaoModel<ClienteData[]>>(`${environment.apiUrl}/staff/tenants`, { params });
  }

  getUsuariosPorID(id: string) {
    return this._http.get<RequisicaoModel<UsuarioData[]>>(`${environment.apiUrl}/staff/users/${id}`);
  }

  editarUsuario(userData: UsuarioData, id: string): Observable<UsuarioData> {
    return this._http.put<UsuarioData>(`${environment.apiUrl}/staff/users/${id}`, userData);
  }
}