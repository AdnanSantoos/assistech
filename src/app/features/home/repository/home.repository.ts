import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TenantService } from '../../../shared/services/tenant.service';
import { environment } from '../../../../environments/environment';
import { RequisicaoModel } from '../../../shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class HomeRepository {
  constructor(private _http: HttpClient, private _tenantService: TenantService) {}
  
  getPhotos() {
    return this._http.get<RequisicaoModel<any>>(`${environment.API_URL}/public/diario-oficial/${this._tenantService.getTenant()}/photos/recent`);
  }

}
