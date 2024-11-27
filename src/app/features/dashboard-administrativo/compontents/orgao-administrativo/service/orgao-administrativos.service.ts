import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { OrgaoModel } from '../model/orgao-administrativo.model';
import { OrgaosRepository } from '../repository/orgao-administrativos.repository';

@Injectable({
  providedIn: 'root',
})
export class OrgaosService {
  constructor(private _repository: OrgaosRepository) {}

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._repository.getOrgaos(page);
  }

  createOrgao(orgaoData: Pick<OrgaoModel, 'country_register'>): Observable<OrgaoModel> {
    return this._repository.createOrgao(orgaoData);
  }
  
}
