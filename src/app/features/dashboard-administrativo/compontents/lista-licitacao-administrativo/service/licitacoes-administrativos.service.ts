import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { RequisicaoModel } from '../../../../../shared/models/shared.model';
import { LicitacaoModel, LicitacaoDetalhesModel, LicitacaoItemModel, LicitacaoArquivos, LicitacaoResultados, LicitacaoAtaModel } from '../model/licitacoes-administrativo.model';
import { LicitacoesRepository } from '../repository/licitacoes-administrativos.repository';
import { OrgaoModel } from '../../orgao-administrativo/model/orgao-administrativo.model';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class LicitacoesService {
  constructor(private _repository: LicitacoesRepository,
    private toastr: ToastrService

  ) { }

  getLicitacoes(page: number): Observable<RequisicaoModel<LicitacaoModel[]>> {
    return this._repository.getLicitacoes(page);
  }

  getLicitacoesDetalhes(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoDetalhesModel[]>> {
    return this._repository.getLicitacoesDetalhes(licitacaoId, page);
  }

  getLicitacoesItens(licitacaoId: string, page: number): Observable<RequisicaoModel<LicitacaoItemModel[]>> {
    return this._repository.getLicitacoesItens(licitacaoId, page);
  }

  getLicitacoesArquivos(tenant: string, procurementId: string, page: number): Observable<RequisicaoModel<LicitacaoArquivos[]>> {
    return this._repository.getLicitacoesArquivos(tenant, procurementId, page);
  }

  getLicitacaoAtas(licitacaoId: string, page: number): Observable<RequisicaoModel<any>> {
    return this._repository.getLicitacaoAtas(licitacaoId, page);
  }

  getOrgaos(page: number): Observable<RequisicaoModel<OrgaoModel[]>> {
    return this._repository.getOrgaos(page);
  }

  getLicitacaoById(id: string): Observable<RequisicaoModel<LicitacaoDetalhesModel>> {
    return this._repository.getLicitacaoById(id);
  }

  createLicitacoes(data: { agency: string; agency_country_register: string }): Observable<void> {
    return this._repository.createLicitacoes(data).pipe(
      tap(() => this.toastr.success('Licitação criada com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar a licitação.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  createLicitacaoItem(data: { procurement: string; item: LicitacaoItemModel }): Observable<void> {
    return this._repository.createLicitacaoItem(data.procurement, data.item).pipe(
      tap(() => this.toastr.success('Item criado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar o item.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  createArquivoLicitacao(data: { tenant: string; procurement: string; file: FormData }): Observable<LicitacaoArquivos> {
    return this._repository.createArquivoLicitacao(data.tenant, data.procurement, data.file).pipe(
      tap(() => this.toastr.success('Arquivo enviado com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao enviar o arquivo.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  createLicitacaoAta(procurementId: string, ataData: FormData): Observable<void> {
    return this._repository.createLicitacaoAta(procurementId, ataData).pipe(
      tap(() => this.toastr.success('ATA criada com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao criar a ATA.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  updateLicitacaoAta(procurementId: string, minutesId: string, ataData: FormData): Observable<void> {
    return this._repository.updateLicitacaoAta(procurementId, minutesId, ataData).pipe(
      tap(() => this.toastr.success('ATA atualizada com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao atualizar a ATA.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  updateLicitacao(id: string, data: any): Observable<void> {
    return this._repository.updateLicitacao(id, data).pipe(
      tap(() => this.toastr.success('Licitação atualizada com sucesso!')),
      catchError((error) => {
        this.toastr.error('Erro ao atualizar a licitação.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  getResultadosItem(procurementId: string, itemId: string): Observable<RequisicaoModel<LicitacaoResultados[]>> {
    return this._repository.getResultadosItem(procurementId, itemId);
  }


  deleteResultado() {

  }

  deleteLicitacao(procurementId: string, justification: string): Observable<void> {
    return this._repository.deleteLicitacao(procurementId, justification);
  }


}
