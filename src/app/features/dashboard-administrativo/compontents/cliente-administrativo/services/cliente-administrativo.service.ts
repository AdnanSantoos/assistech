import { Injectable } from '@angular/core';
import { ClienteAdministrativoRepository } from '../repository/cliente-administrativo.repository';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ClienteData } from '../../../model/cliente.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ClienteAdministrativoService {

  constructor(private _repository: ClienteAdministrativoRepository, private _toastrService: ToastrService) { }


  public getClientes(page: number): Observable<any> {
    return this._repository.getClientes(page);
  }

  createUser(clientData: ClienteData): Observable<ClienteData> {
    return this._repository.createUser(clientData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao cadastrar cliente!', 'Erro');
        throw error;
      }),
      switchMap((response: ClienteData) => {
        this._toastrService.success('Cliente cadastrado com sucesso!', 'Sucesso');
        return of(response);
      })
    );
  }

  searchCities(label: string): Observable<any> {
    return this._repository.searchCities(label);
  }

}
