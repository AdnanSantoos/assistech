import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ContratosRepository } from '../repository/contratos-administrativos.repository';
import { ContratoModel, RequisicaoContratoModel, TermosContratosModel } from '../model/contratos-administrativo.model';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  constructor(private _repository: ContratosRepository) { }

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    return this._repository.getContratos(page);
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._repository.createContrato(data);
  }

  createTermo(data: Partial<TermosContratosModel>): Observable<void> {
    return this._repository.createTermoContrato(data);
  }

  getContratoById(id: string): Observable<ContratoModel> {
    return this._repository.getContratoById(id).pipe(
      map((response) => {
        if (!response || !response.data) {
          throw new Error('Contrato não encontrado.');
        }
        return response.data;
      })
    );
  }

  getContractTerms(contractId: string, page: number): Observable<any> {
    return this._repository.getContractTerms(contractId, page);
  }

  getContractFiles(contractId: string, page: number): Observable<any> {
    return this._repository.getContractFiles(contractId, page);
  }

  updateContrato(id: string, data: Partial<ContratoModel>): Observable<void> {
    return this._repository.updateContrato(id, data);
  }

  deleteContrato(procurementId: string, justification: string): Observable<void> {
    return this._repository.deleteContrato(procurementId, justification);
  }

  getTermoById(termoId: string): Observable<TermosContratosModel> {
    return this._repository.getTermoById(termoId).pipe(
      map((response) => {
        if (!response || !response.data) {
          throw new Error('Termo não encontrado.');
        }

        // Retornando o termo como está, sem conversão de datas
        return response.data;
      })
    );
  }


  // Adicionar método para atualizar um termo existente
  updateTermo(termoId: string, data: Partial<TermosContratosModel>): Observable<void> {
    return this._repository.updateTermoContrato(termoId, data);
  }


  uploadFile(contractId: string, data: FormData): Observable<void> {
    return this._repository.uploadFile(contractId, data);
  }
  
}
