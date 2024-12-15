import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment.development';
import { ProcurementModel } from '../model/adicionar-licitacao.model';
import { OrgaoModel } from '../../../../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class AdicionarLicitacaoRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/procurements`;

  constructor(private _http: HttpClient) { }

  getOrgaosPage(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, { params });
  }
  getOrgaos(): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl);
  }

  criarLicitacao(formData: FormData): Observable<ProcurementModel> {
    return this._http.post<ProcurementModel>(this.baseUrl, formData);
  }

}
