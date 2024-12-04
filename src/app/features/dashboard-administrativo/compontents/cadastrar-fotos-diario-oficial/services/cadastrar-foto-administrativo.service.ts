import { Injectable } from '@angular/core';
import { CadastrarFotosAdministrativoRepository } from '../repository/cadastrar-foto-administrativo.repository';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CadastrarFotosAdministrativoService {
  constructor(
    private _repository: CadastrarFotosAdministrativoRepository,
    private _toastrService: ToastrService,
    private _location: Location
  ) { }

  goBack(): void {
    this._location.back();
  }

  CadastrarFoto(photoData: FormData): Observable<any> {
    return this._repository.CadastrarFoto(photoData).pipe(
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

  uploadLogo(logoData: FormData): Observable<void> {
    return this._repository.uploadLogo(logoData).pipe(
      catchError((error) => {
        this._toastrService.error('Erro ao enviar o logotipo!', 'Erro');
        throw error;
      })
    );
  }



}
