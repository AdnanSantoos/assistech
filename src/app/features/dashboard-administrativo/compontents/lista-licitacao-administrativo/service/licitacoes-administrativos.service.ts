import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { LicitacaoModel } from '../model/licitacoes-administrativo.model';
import { LicitacoesRepository } from '../repository/licitacoes-administrativos.repository';


@Injectable({
  providedIn: 'root',
})
export class LicitacoesService {
  constructor(private _repository: LicitacoesRepository) { }

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    return this._repository.getLicitacoes(page);
  }

  createLicitacoes(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._repository.createLicitacoes(data);
  }

}
