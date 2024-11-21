import { Injectable } from '@angular/core';
import { TenantFullModel, TenantModel } from '../models/shared.model';


@Injectable({
  providedIn: 'root'
})
export class TenantMapper {
  mapToTenant(response: TenantFullModel): TenantModel {
    return {
      slug: response.slug,
      name: response.name,
      city_name: response.city_name,
      state_uf: response.state_uf,
      year: response.year,
    };
  }
}
