import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import {
  RequisicaoContratoModel,
  ContratoModel,
  TermosContratosModel,
  ArquivoContratoModel,
} from '../model/contratos-administrativo.model';
import { environment } from '../../../../../../environments/environment';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class ContratosRepository {
  private readonly baseUrl = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/contracts`;

  constructor(private _http: HttpClient) {}

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<RequisicaoContratoModel>(this.baseUrl, { params });
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._http.post<void>(this.baseUrl, data);
  }

  createTermoContrato(data: Partial<TermosContratosModel>): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms`;
    return this._http.post<void>(url, data);
  }

  getContratoById(id: string): Observable<RequisicaoModel<ContratoModel>> {
    return this._http.get<RequisicaoModel<ContratoModel>>(
      `${this.baseUrl}/${id}`
    );
  }

  deleteContrato(
    procurementId: string,
    justification: string
  ): Observable<void> {
    const body = { justification };
    return this._http.delete<void>(`${this.baseUrl}/${procurementId}`, {
      body,
    });
  }

  deleteTermosContrato(
    procurementId: string,
    justification: string
  ): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${procurementId}`;
    const params = { justification }; // Adiciona o parâmetro como query string

    return this._http.delete<void>(url, { params }).pipe(
      tap(() => console.log('Contrato excluído com sucesso!')), // Para logs internos
      catchError((error) => {
        console.error('Erro ao excluir contrato:', error); // Log do erro
        throw error;
      })
    );
  }

  deleteArquivoTermos(
    termId: string,
    file: ArquivoContratoModel,
    justification: string
  ): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termId}/files/${file.id}`;
    const params = { justification }; // Passa justification como query param

    return this._http.delete<void>(url, { params }).pipe(
      catchError((error) => {
        console.error(`Erro ao excluir o arquivo ${file.label}:`, error);
        throw error;
      })
    );
  }

  updateContrato(id: string, data: Partial<ContratoModel>): Observable<void> {
    return this._http.put<void>(`${this.baseUrl}/${id}`, data);
  }

  getArquivosContractFiles(
    termId: string,
    page: number
  ): Observable<{ data: ArquivoContratoModel[]; meta: any }> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/contracts/${termId}/files`;
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<{ data: ArquivoContratoModel[]; meta: any }>(url, {
      params,
    });
  }

  getContractFiles(termId: string, page: number): Observable<any> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termId}/files`;
    const params = new HttpParams().set('page', page.toString());
    return this._http.get<any>(url, { params });
  }

  deleteFileTermos(fileId: string): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/files/${fileId}`;
    return this._http.delete<void>(url);
  }

  createTermosContratos(termId: string, data: FormData): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termId}/files`;
    return this._http.post<void>(url, data);
  }
  createArquivoContrato(contractId: string, data: FormData): Observable<void> {
    const url = `${this.baseUrl}/${contractId}/files`;
    return this._http.post<void>(url, data);
  }
  

  getContractTerms(contractId: string, page: number): Observable<any> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms`;
    const params = new HttpParams()
      .set('contract_id', contractId)
      .set('page', page.toString());

    return this._http.get<any>(url, { params });
  }

  getTermoById(termoId: string): Observable<{ data: TermosContratosModel }> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termoId}`;
    return this._http.get<{ data: TermosContratosModel }>(url);
  }

  // Adicionar método para atualizar um termo existente
  updateTermoContrato(
    termoId: string,
    data: Partial<TermosContratosModel>
  ): Observable<void> {
    const url = `${environment.apiUrl}/tenants/${environment.tenant}/pncp/terms/${termoId}`;
    return this._http.put<void>(url, data);
  }

  uploadFile(url: string, data: FormData): Observable<void> {
    return this._http.post<void>(url, data);
  }
}
