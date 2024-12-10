import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { GerenciadorDiarioOficialRepository } from "../repository/gerenciador-diario-oficial.repository";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})

export class GerenciadorDiarioOficialService {

  constructor(
    private _repository: GerenciadorDiarioOficialRepository,
    private toastr: ToastrService
  ) {
  }

  public getDashboard(page: number): Observable<any> {
    return this._repository.getListaDiarioOficial(page);
  }

  onDeleteItem(id: string): Observable<void> {
    return this._repository.onDeleteItem(id).pipe(
      tap(() => {
        this.toastr.success('Documento excluído com sucesso!', 'Sucesso');
      }),
      catchError((error) => {
        this.toastr.error('Erro ao excluir o documento.', 'Erro');
        throw error;
      })
    );
  }
  public onDeletePages(id: string, pages: number[]): Observable<void> {
    return this._repository.onDeletePages(id, pages).pipe(
      tap(() => {
        this.toastr.success('Páginas excluídas com sucesso!', 'Sucesso');
      }),
      catchError((error) => {
        this.toastr.error('Erro ao excluir as páginas.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  public getDocumentPages(id: string): Observable<{ data: { pages: number; file_upload: string } }> {
    return this._repository.getDocumentPages(id).pipe(
      tap((response) => {
        console.log('Resposta do repositório (páginas):', response); // Log da resposta no serviço
      }),
      catchError((error) => {
        this.toastr.error('Erro ao carregar as páginas do documento.', 'Erro');
        return throwError(() => error);
      })
    );
  }

  attachDocument(id: string, file: File): Observable<{ data: { status: boolean } }> {
    return this._repository.attachDocument(id, file).pipe(
      tap(() => {
        this.toastr.success('Documento anexado com sucesso!', 'Sucesso');
      }),
      catchError((error) => {
        this.toastr.error('Erro ao anexar o documento.', 'Erro');
        return throwError(() => error);
      })
    );
  }
}
