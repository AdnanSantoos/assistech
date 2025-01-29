import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { RequisicaoModel, TenantFullModel } from '../models/shared.model';
import { ExibirClienteData } from '../../features/dashboard-administrativo/model/cliente.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private _baseUrl = `${environment.API_URL}/public/tenants`;
  private _tenantState = new BehaviorSubject<TenantFullModel | null>(null);
  public state$ = this._tenantState.asObservable();

  private slugSubject = new BehaviorSubject<string | null>(null);
  slug$ = this.slugSubject.asObservable();

  constructor(private http: HttpClient, private _toastrService: ToastrService) {
    const savedSlug = localStorage.getItem('slug');
    this.slugSubject = new BehaviorSubject<string | null>(savedSlug);
    this.slug$ = this.slugSubject.asObservable().pipe(
      tap((slug) => {
        console.log('Slug$ mudou para:', slug);
        localStorage.setItem('slug', slug!);
      })
    );

    this.state$ = this._tenantState
      .asObservable()
      .pipe(tap((slug) => console.log('State$ mudou para:', slug)));
  }

  getTenantFull(): Observable<RequisicaoModel<TenantFullModel[]>> {
    return this.http.get<RequisicaoModel<TenantFullModel[]>>(
      `${environment.API_URL}/staff/tenants`
    );
  }

  getTenantFilter(
    page?: number,
    searchTerm?: string
  ): Observable<RequisicaoModel<TenantFullModel[]>> {
    // Usando HttpParams para garantir que os parâmetros sejam construídos corretamente
    let params = new HttpParams();

    // Sempre incluir a página
    params = params.set('page', page?.toString() || '1');

    // Só incluir o termo de busca se não for vazio ou undefined
    if (searchTerm?.trim()) {
      params = params.set('search', searchTerm.trim());
    }

    return this.http
      .get<RequisicaoModel<TenantFullModel[]>>(
        `${environment.API_URL}/staff/tenants`,
        { params }
      )
      .pipe(
        tap((response) =>
          console.log('Resposta do filtro:', {
            searchTerm,
            page,
            totalResults: response.data?.length,
            params: params.toString(),
          })
        )
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
  updateProfile(
    tenant: string,
    data: { name: string }
  ): Observable<RequisicaoModel<any>> {
    return this.http
      .patch<RequisicaoModel<any>>(
        `${environment.API_URL}/tenants/${tenant}/auth/me`,
        data
      )
      .pipe(
        catchError((error) => {
          this._toastrService.error('Erro ao atualizar nome!', 'Erro');
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success(
            'Nome atualizado com sucesso!',
            'Sucesso'
          );
          return of(response);
        })
      );
  }

  updatePassword(
    tenant: string,
    data: {
      current_password: string;
      password: string;
      password_confirmation: string;
    }
  ): Observable<RequisicaoModel<any>> {
    return this.http
      .put<RequisicaoModel<any>>(
        `${environment.API_URL}/tenants/${tenant}/auth/password`,
        data
      )
      .pipe(
        catchError((error) => {
          this._toastrService.error('Erro ao atualizar senha!', 'Erro');
          throw error;
        }),
        switchMap((response) => {
          this._toastrService.success(
            'Senha atualizada com sucesso!',
            'Sucesso'
          );
          return of(response);
        })
      );
  }

  updateState(newState: TenantFullModel) {
    this._tenantState.next(newState);
    localStorage.setItem('name', newState.name);
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

  getTenantByStaff(
    tenant: string
  ): Observable<RequisicaoModel<ExibirClienteData>> {
    return this.http
      .get<RequisicaoModel<ExibirClienteData>>(
        `${environment.API_URL}/staff/${tenant}`
      )
      .pipe(
        tap((response) =>
          console.log('Resposta do getTenantByStaff:', response)
        )
      );
  }
}
