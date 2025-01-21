import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { environment } from '../../../../../../environments/environment';
import { TenantService } from '../../../../../shared/services/tenant.service';
import { ContractPlanItemModel, ContractPlanModel } from '../model/pca.model';


@Injectable({
  providedIn: 'root',
})
export class ContractPlansRepository {
  private get baseUrl() {
    return `${environment.API_URL}/tenants/${this._tenantService.getTenant()}/pncp/contract_plans`;
  }

  constructor(
    private _http: HttpClient,
    private _tenantService: TenantService
  ) {}

  // GET /v1/tenants/{tenant}/pncp/contract-plans
  getContractPlans(): Observable<RequisicaoModel<ContractPlanModel[]>> {
    return this._http.get<RequisicaoModel<ContractPlanModel[]>>(this.baseUrl);
  }
  // getContractPlans(page: number): Observable<RequisicaoModel<ContractPlanModel[]>> {
  //   const params = new HttpParams().set('page', page.toString());
  //   return this._http.get<RequisicaoModel<ContractPlanModel[]>>(
  //     this.baseUrl,
  //     { params }
  //   );
  // }

  // POST /v1/tenants/{tenant}/pncp/contract-plans
  createContractPlan(data: ContractPlanModel): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }

  // GET /v1/tenants/{tenant}/pncp/contract-plans/{contract_plan}
  getContractPlanById(contractPlanId: string): Observable<RequisicaoModel<ContractPlanModel>> {
    return this._http.get<RequisicaoModel<ContractPlanModel>>(
      `${this.baseUrl}/${contractPlanId}`
    );
  }

  // DELETE /v1/tenants/{tenant}/pncp/contract-plans/{contract_plan}
  deleteContractPlan(contractPlanId: string, justification: string): Observable<void> {
    const params = new HttpParams().set('justification', justification);
    return this._http.delete<void>(
      `${this.baseUrl}/${contractPlanId}`,
      { params }
    );
  }

  // POST /v1/tenants/{tenant}/pncp/contract-plans/{contract_plan}/items
  createContractPlanItem(
    contractPlanId: string,
    data: ContractPlanItemModel
  ): Observable<void> {
    return this._http.post<void>(
      `${this.baseUrl}/${contractPlanId}/items`,
      data
    );
  }

  // PUT /v1/tenants/{tenant}/pncp/contract-plans/{contract_plan}/items/{contract_plan_item}
  updateContractPlanItem(
    contractPlanId: string,
    itemId: string,
    data: ContractPlanItemModel
  ): Observable<void> {
    return this._http.put<void>(
      `${this.baseUrl}/${contractPlanId}/items/${itemId}`,
      data
    );
  }

  // DELETE /v1/tenants/{tenant}/pncp/contract-plans/{contract_plan}/items/{contract_plan_item}
  deleteContractPlanItem(
    contractPlanId: string,
    itemId: string,
    justification: string
  ): Observable<void> {
    const params = new HttpParams().set('justification', justification);
    return this._http.delete<void>(
      `${this.baseUrl}/${contractPlanId}/items/${itemId}`,
      { params }
    );
  }
}
