import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { LicitacaoModel, LicitacaoDetalhesModel } from '../model/licitacoes-administrativo.model';
import { LicitacoesRepository } from '../repository/licitacoes-administrativos.repository';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService {
  constructor(private _repository: LicitacoesRepository) {}

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    return this._repository.getLicitacoes(page);
  }

  getLicitacaoById(id: string): Observable<RequisicaoModel<LicitacaoDetalhesModel>> {
    return this._repository.getLicitacaoById(id);
  }
  createLicitacoes(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._repository.createLicitacoes(data);
  }

  updateLicitacao(id: string, data: any): Observable<void> {
    return this._repository.updateLicitacao(id, data);
  }
}
