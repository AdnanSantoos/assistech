import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GerenciadorDiarioOficialRepository } from "../repository/gerenciador-diario-oficial.repository";

@Injectable({
    providedIn: 'root',
  })

  export class GerenciadorDiarioOficialService {

    constructor(
        private _repository: GerenciadorDiarioOficialRepository
      ) {
    }


    public getDashboard(page:number): Observable<any> {
        return this._repository.getListaDiarioOficial(page);
      }

  }
  