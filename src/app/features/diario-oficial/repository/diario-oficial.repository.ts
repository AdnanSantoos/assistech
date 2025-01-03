import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RequisicaoModel } from '../../../shared/models/shared.model';
import { DadosDiarioOficialPublico, DiarioOficialPesquisaData } from '../models/diario-oficial.model';
import { TenantService } from '../../../shared/services/tenant.service';
@Injectable({
  providedIn: 'root',
})
export class DiarioRepository {
  constructor(private _http: HttpClient, private _tenantService: TenantService) {}
  
  getDiarioPublicoPorFiltro(query:DiarioOficialPesquisaData) {
    let queryParams = new HttpParams();
    if(query.year){
      queryParams = queryParams.append('year',query.year);
    }
    if(query.month){
      queryParams = queryParams.append('month', query.month);
    }
    if(query.content){
      queryParams = queryParams.append('content', query.content);
    }
    if(query.number){
      queryParams = queryParams.append('number', query.number);
    }
    return this._http.get<RequisicaoModel<DadosDiarioOficialPublico>>(`${environment.API_URL}/public/tenants/${this._tenantService.getTenant()}/official-gazettes`, { params: queryParams });
  }

  getDiarioPublicoEntidade() {
    return this._http.get(`${environment.API_URL}/public/tenants/${this._tenantService.getTenant()}`);
  }

}
