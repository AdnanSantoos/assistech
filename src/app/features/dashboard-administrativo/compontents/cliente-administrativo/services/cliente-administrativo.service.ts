import { Injectable } from '@angular/core';
import { ClienteAdministrativoRepository } from '../repository/cliente-administrativo.repository';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ClienteData } from '../../../model/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteAdministrativoService {

  constructor(private _repository: ClienteAdministrativoRepository, private _toastrService: ToastrService, private _location: Location) { }


  public getClientes(page: number): Observable<any> {
    return this._repository.getClientes(page);
  }
  goBack(): void {
    this._location.back();
  }
  createUser(clientData: ClienteData): Observable<ClienteData> {
    return this._repository.createUser(clientData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao cadastrar cliente!', 'Erro');
        throw error;
      }),
      switchMap((response: ClienteData) => {
        this._toastrService.success('Cliente cadastrado com sucesso!', 'Sucesso');
        this.goBack();
        return of(response);
      })
    );
  }

  searchCities(label: string): Observable<any> {
    return this._repository.searchCities(label);
  }

  updateCliente(slug: string, data: any): Observable<void> {
    return this._repository.updateCliente(slug, data);
  }


  public getClienteBySlug(slug: string): Observable<any> {
    return this._repository.getClienteBySlug(slug);
  }

  uploadLogo(slug: string, logoFile: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', logoFile);
  
    return this._repository.uploadLogo(slug, formData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao enviar o logotipo!', 'Erro');
        throw error;
      })
    );
  }
  


}
