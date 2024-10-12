import { Injectable } from '@angular/core';
import { DiarioRepository } from '../repository/diario-oficial.repository';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RequisicaoModel } from '../../../shared/models/shared.model';
import { DadosDiarioOficialPublico, DiarioOficialPesquisaData } from '../models/diario-oficial.model';

@Injectable({
  providedIn: 'root',
})
export class DiarioOficialService {

  get publicacoesDiario$(): Observable<RequisicaoModel<DadosDiarioOficialPublico> | null>{
    return this.diario$
  }

  private diarioSubject = new BehaviorSubject<RequisicaoModel<DadosDiarioOficialPublico> | null>(null);

  public diario$: Observable<RequisicaoModel<DadosDiarioOficialPublico> | null> = this.diarioSubject.asObservable();

  constructor(
    private _repository: DiarioRepository
  ) {
    }

    // public getDiario() {
    //   this._repository.getDiarioPublicacoes().subscribe({
    //     next: (response: RequisicaoModel<DadosDiarioOficialPublico>) => {
    //      this.diarioSubject.next(response)
    //     },
    //     error: (err: any) => {
    //       console.error(err)
    //     },
    //   });
    // }

  public getDiarioPublicoPorFiltro(form:DiarioOficialPesquisaData) {
    return this._repository.getDiarioPublicoPorFiltro(form).subscribe((res:RequisicaoModel<DadosDiarioOficialPublico>)=>{
      this.diarioSubject.next(res)
    });
  }

  // public getDiarioPublico() {
  //   this._repository.getDiarioPublico().subscribe({
  //     next: (response) => {
  //       console.log('diario publico',response)
  //     },
  //     error: (err) => console.log(err)
  //   });    
  // }

  public getDiarioPublicoEntidade(): Observable<any> {
    return this._repository.getDiarioPublicoEntidade();
  }
  
}
