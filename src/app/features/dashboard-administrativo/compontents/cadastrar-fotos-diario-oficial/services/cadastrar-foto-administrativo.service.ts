import { Injectable } from '@angular/core';
import { ClienteAdministrativoRepository } from '../repository/cadastrar-foto-administrativo.repository';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ClienteAdministrativoService {
  constructor(
    private _repository: ClienteAdministrativoRepository,
    private _toastrService: ToastrService,
    private _location: Location
  ) {}

  goBack(): void {
    this._location.back();
  }

  CadastrarFoto(tenant: string, photoData: FormData): Observable<any> {
    console.log('chegando no service')
    return this._repository.CadastrarFoto(tenant, photoData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao cadastrar foto!', 'Erro');
        throw error;
      }),
      switchMap((response) => {
        this._toastrService.success('Foto cadastrada com sucesso!', 'Sucesso');
        this.goBack();
        return of(response);
      })
    );
  }
}
