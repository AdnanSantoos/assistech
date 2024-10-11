import { environment } from './../../../../environments/environment';
import { DiarioOficialPesquisaData, DiarioOficialPublico } from './../models/diario-oficial.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DiarioRepository } from '../repository/diario-oficial.repository';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiarioOficialService {
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _repository: DiarioRepository
  ) {}

    //Só está funcionando o retorno de diário público entidade


  public getDiario(): Observable<any> {
    return this._repository.getDiarioPublicacoes();
  }

  public getDiarioPublicoPorData(): Observable<any> {
    return this._repository.getDiarioPublicoPorData();
  }

  public getDiarioPublico(): Observable<DiarioOficialPublico> {
    return this._repository.getDiarioPublico();
  }

  public getDiarioPublicoEntidade(): Observable<any> {
    return this._repository.getDiarioPublicoEntidade();
  }
}
