import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { UsuarioData } from '../../../model/usuarios.model';
import { UsuariosRepository } from '../repository/usuarios-administrativos.repository';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private repository: UsuariosRepository) {}

  getUsuarios(page: number): Observable<RequisicaoModel<UsuarioData[]>> {
    return this.repository.getUsuarios(page);
  }

  createUser (userData: UsuarioData): Observable<UsuarioData> {
    return this.repository.createUser (userData);
  }
}