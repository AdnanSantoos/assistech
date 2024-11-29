import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratosRepository } from '../repository/contratos-administrativos.repository';
import { ContratoModel, RequisicaoContratoModel } from '../model/contratos-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  constructor(private _repository: ContratosRepository) {}

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    return this._repository.getContratos(page);
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._repository.createContrato(data);
  }

  getContratoById(id: string): Observable<ContratoModel> {
    return this._repository.getContratoById(id);
  }
}
