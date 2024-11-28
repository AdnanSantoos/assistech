import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { UnidadesRepository } from '../repository/unidades-administrativos.repository';
import { UnidadeModel } from '../model/unidades-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  constructor(private _repository: UnidadesRepository) {}

  getUnidade(page: number): Observable<RequisicaoModel<UnidadeModel[]>> {
    return this._repository.getUnidade(page);
  }

  createUnidade(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._repository.createUnidade(data);
  }
  
}
