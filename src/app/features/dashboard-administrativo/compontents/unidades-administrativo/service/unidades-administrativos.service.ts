import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { UnidadesRepository } from '../repository/unidades-administrativos.repository';
import { UnidadeModel } from '../model/unidades-administrativo.model';
import { Location } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  constructor(private _repository: UnidadesRepository, private _location: Location, private _toastr: ToastrService) { }
  goBack(): void {
    this._location.back();
  }
  getUnidade(page: number): Observable<RequisicaoModel<UnidadeModel[]>> {
    return this._repository.getUnidade(page);
  }

  createUnidade(data: {
    agency_country_register: string;
    code: string;
    name: string;
    city_code: number;
  }): Observable<void> {
    return this._repository.createUnidade(data).pipe(
      tap(() => {
        this._toastr.success('Unidade cadastrada com sucesso!', 'Sucesso');
        this.goBack();
      }),
      catchError((error) => {
        this._toastr.error(
          'Erro ao cadastrar unidade. Tente novamente.',
          'Erro'
        );
        throw error;
      })
    );
  }

  getCidades(label: string): Observable<{ data: Array<{ code: string; label: string }> }> {
    return this._repository.getCidades(label);
  }
}
