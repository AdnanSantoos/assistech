import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { ProcurementModel } from '../model/adicionar-licitacao.model';
import { OrgaoModel } from '../../../../dashboard-administrativo/compontents/orgao-administrativo/model/orgao-administrativo.model';
import { TenantService } from '../../../../../shared/services/tenant.service';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdicionarLicitacaoRepository {
  private readonly baseUrl = `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/pncp/procurements`;
  private readonly baseUrlOrgao = `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/pncp/agencies`;

  constructor(private _http: HttpClient, private _tenantService: TenantService) { }

  getOrgaosPage(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, { params });
  }
  getOrgaos(): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrlOrgao);
  }

  criarLicitacao(formData: FormData): Observable<ProcurementModel> {
    return this._http.post<ProcurementModel>(this.baseUrl, formData);
  }

}
