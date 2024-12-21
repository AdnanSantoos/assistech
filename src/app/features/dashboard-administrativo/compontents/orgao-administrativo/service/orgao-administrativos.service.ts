import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { OrgaoModel } from '../model/orgao-administrativo.model';
import { OrgaosRepository } from '../repository/orgao-administrativos.repository';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrgaosService {
  constructor(private _repository: OrgaosRepository, private _toastr: ToastrService, private _location: Location) { }

  goBack(): void {
    this._location.back();
  }
  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._repository.getOrgaos(page);
  }

  createOrgao(orgaoData: Pick<OrgaoModel, 'country_register'>): Observable<OrgaoModel> {
    return this._repository.createOrgao(orgaoData).pipe(
      tap((orgaoCriado) => {
        this._toastr.success(
          `Órgão cadastrado com sucesso!`,
          'Sucesso'
        );
        this.goBack()
      }),
      catchError((erro) => {
        this._toastr.error('Erro ao cadastrar órgão. Tente novamente.', 'Erro');
        throw erro; // Propaga o erro para o componente, se necessário
      })
    );
  }
  getOrgaoPorRegistro(countryRegister: string): Observable<{ data: OrgaoModel }> {
    return this._repository.getOrgaoPorRegistro(countryRegister);
  }

  deleteOrgao(countryRegister: string): Observable<void> {
    return this._repository.deleteOrgao(countryRegister).pipe(
      tap(() => {
        this._toastr.success(`Órgão com registro "${countryRegister}" excluído com sucesso!`, 'Sucesso');
      }),
      catchError((error) => {
        this._toastr.error('Erro ao excluir órgão. Tente novamente.', 'Erro');
        throw error; // Propaga o erro para o componente, se necessário
      })
    );
  }



}
