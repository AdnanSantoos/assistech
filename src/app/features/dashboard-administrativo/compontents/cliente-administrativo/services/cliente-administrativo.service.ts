import { Injectable } from '@angular/core';
import { ClienteAdministrativoRepository } from '../repository/cliente-administrativo.repository';
import { Observable } from 'rxjs';
import { ClienteData } from '../../../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteAdministrativoService {

constructor( private _repository: ClienteAdministrativoRepository) { }


public getClientes(page:number): Observable<any> {
  return this._repository.getClientes(page);
}

createUser(clientData: ClienteData): Observable<ClienteData> {
  return this._repository.createUser(clientData);
}

}
