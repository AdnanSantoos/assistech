import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { OrgaoModel, OrgaoResponse } from '../model/orgao-administrativo.model';
import { TenantService } from '../../../../../shared/services/tenant.service';

@Injectable({
  providedIn: 'root',
})
export class OrgaosRepository {
  private get baseUrl() {
    return `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/pncp/agencies`;
  }

  constructor(private _http: HttpClient, private _tenantService: TenantService ) { }

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    const params = new HttpParams().set('page', page.toString());
    console.log(this._tenantService.getTenant())
    return this._http.get<RequisicaoModel<OrgaoModel[]>>(this.baseUrl, { params });
  }

  getOrgaoPorRegistro(countryRegister: string): Observable<{ data: OrgaoModel }> {
    const url = `${this.baseUrl}/${countryRegister}`;
    return this._http.get<{ data: OrgaoModel }>(url);
  }

  createOrgao(orgaoData: Pick<OrgaoModel, 'country_register'>): Observable<OrgaoModel> {
    return this._http.post<OrgaoModel>(this.baseUrl, orgaoData);
  }
  deleteOrgao(countryRegister: string): Observable<void> {
    const url = `${this.baseUrl}/${countryRegister}`;
    return this._http.delete<void>(url);
  }
  

}
