import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../shared/models/shared.model';
import { OrgaoModel } from '../../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { AdicionarLicitacaoRepository } from '../repository/adicionar-licitacao.repository';
import { ProcurementModel } from '../model/adicionar-licitacao.model';


@Injectable({
  providedIn: 'root',
})
export class AdicionarLicitacaoService {
  constructor(private _repository: AdicionarLicitacaoRepository) { }


  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._repository.getOrgaos(page);
  }
  criarLicitacao(formData: FormData): Observable<ProcurementModel> {
    return this._repository.criarLicitacao(formData);
  }

}
