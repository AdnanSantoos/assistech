import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ContratosRepository } from '../repository/contratos-administrativos.repository';
import {
  ArquivoContratoModel,
  ContratoModel,
  RequisicaoContratoModel,
  TermosContratosModel,
} from '../model/contratos-administrativo.model';

@Injectable({
  providedIn: 'root',
})
export class ContratosService {
  private contratosUpdated = new Subject<void>();

  constructor(
    private _repository: ContratosRepository,
    private toastr: ToastrService // Injeta o ToastrService
  ) {}

  getContratos(page: number): Observable<RequisicaoContratoModel> {
    return this._repository.getContratos(page);
  }

  createContrato(data: Partial<ContratoModel>): Observable<void> {
    return this._repository.createContrato(data).pipe(
      tap(() => this.toastr.success('Contrato criado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar contrato.');
        throw error;
      })
    );
  }

  createTermo(data: Partial<TermosContratosModel>): Observable<void> {
    return this._repository.createTermoContrato(data).pipe(
      tap(() => this.toastr.success('Termo criado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar termo.');
        throw error;
      })
    );
  }

  getContratoById(id: string): Observable<ContratoModel> {
    return this._repository.getContratoById(id).pipe(
      map((response) => {
        if (!response || !response.data) {
          throw new Error('Contrato não encontrado.');
        }
        return response.data;
      }),
      catchError((error) => {
        throw error;
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
    return this._repository.updateContrato(id, data).pipe(
      tap(() => this.toastr.success('Contrato atualizado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao atualizar contrato.');
        throw error;
      })
    );
  }

  deleteContrato(
    procurementId: string,
    justification: string
  ): Observable<void> {
    return this._repository.deleteContrato(procurementId, justification).pipe(
      tap(() => this.toastr.success('Contrato excluído com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao excluir contrato.');
        throw error;
      })
    );
  }
  deleteTermosContrato(
    procurementId: string,
    justification: string
  ): Observable<void> {
    return this._repository
      .deleteTermosContrato(procurementId, justification)
      .pipe(
        tap(() => {
          this.toastr.success('Contrato excluído com sucesso!');
          this.contratosUpdated.next(); // Notifica a atualização
        }),
        catchError((error) => {
          this.toastr.error('Erro ao excluir contrato.');
          throw error;
        })
      );
  }

  getContratosUpdatedListener(): Observable<void> {
    return this.contratosUpdated.asObservable();
  }
  deleteArquivoTermos(
    termId: string,
    file: ArquivoContratoModel,
    justification: string
  ): Observable<void> {
    return this._repository
      .deleteArquivoTermos(termId, file, justification)
      .pipe(
        tap(() =>
          this.toastr.success(`Arquivo "${file.label}" excluído com sucesso!`)
        ),
        catchError((error) => {
          this.toastr.error(`Erro ao excluir o arquivo "${file.label}".`);
          throw error;
        })
      );
  }

  createTermosContratos(termId: string, data: FormData): Observable<void> {
    return this._repository.createTermosContratos(termId, data).pipe(
      tap(() => this.toastr.success('Termos do contrato criados com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar termos do contrato.');
        throw error;
      })
    );
  }

  getTermoById(termoId: string): Observable<TermosContratosModel> {
    return this._repository.getTermoById(termoId).pipe(
      map((response) => {
        if (!response || !response.data) {
          throw new Error('Termo não encontrado.');
        }
        return response.data;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  updateTermo(
    termoId: string,
    data: Partial<TermosContratosModel>
  ): Observable<void> {
    return this._repository.updateTermoContrato(termoId, data).pipe(
      tap(() => this.toastr.success('Termo atualizado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao atualizar termo.');
        throw error;
      })
    );
  }

  uploadFile(contractId: string, data: FormData): Observable<void> {
    return this._repository.uploadFile(contractId, data).pipe(
      tap(() => this.toastr.success('Arquivo enviado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao enviar arquivo.');
        throw error;
      })
    );
  }

  deleteFileTermos(fileId: string): Observable<void> {
    return this._repository.deleteFileTermos(fileId).pipe(
      tap(() => this.toastr.success('Arquivo excluído com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao excluir arquivo.');
        throw error;
      })
    );
  }
}
