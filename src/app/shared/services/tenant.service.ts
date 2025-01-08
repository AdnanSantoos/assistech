import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RequisicaoModel,
  RequisicaoTenantFullModel,
  TenantFullModel,
} from '../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private _baseUrl = `${environment.API_URL}/public/tenants`;
  private _tenantState = new BehaviorSubject<TenantFullModel | null>(null);
  public state$ = this._tenantState.asObservable();

  private slugSubject = new BehaviorSubject<string | null>(null);
  slug$ = this.slugSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedSlug = localStorage.getItem('slug');
    console.log(savedSlug)
    this.slugSubject = new BehaviorSubject<string | null>(savedSlug);
  }

  getTenantFull(): Observable<RequisicaoModel<TenantFullModel[]>> {
    return this.http.get<RequisicaoModel<TenantFullModel[]>>(
      `${environment.API_URL}/staff/tenants`
    );
  }

  getTenantData(tenant: string): Observable<RequisicaoModel<TenantFullModel>> {
    return this.http.get<RequisicaoModel<TenantFullModel>>(
      `${this._baseUrl}/${tenant}`
    );
  }

  getDados(tenant: string): Observable<RequisicaoModel<any>> {
    return this.http.get<RequisicaoModel<any>>(
      `${environment.API_URL}/tenants/${tenant}/auth/me`
    );
  }

  updateState(newState: TenantFullModel) {
    this._tenantState.next(newState);
  }

  getStaff(): boolean {
    return !!localStorage.getItem('isStaff');
  }

  getTenant() {
    return this.slugSubject.getValue();
  }

  setSlug(slug: string) {
    this.slugSubject.next(slug);
    localStorage.setItem('slug', slug);
  }

}
