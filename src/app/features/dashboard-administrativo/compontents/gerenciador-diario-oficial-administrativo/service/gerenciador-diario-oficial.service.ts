import { Injectable } from "@angular/core";
import { catchError, Observable, tap } from "rxjs";
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

}
