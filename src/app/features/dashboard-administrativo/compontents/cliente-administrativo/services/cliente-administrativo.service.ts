import { Injectable } from '@angular/core';
import { ClienteAdministrativoRepository } from '../repository/cliente-administrativo.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteAdministrativoService {

constructor( private _repository: ClienteAdministrativoRepository) { }


public getClientes(page:number): Observable<any> {
  return this._repository.getClientes(page);
}

}
