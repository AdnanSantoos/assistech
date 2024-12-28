import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DashboardHomeRepository } from "../repository/diario-oficial.repository";

@Injectable({
    providedIn: 'root',
  })

  export class DashboardHomeService {

    constructor(
        private _repository: DashboardHomeRepository
      ) {
    }


    public getDashboard(): Observable<any> {
        return this._repository.getDashboard();
    }

  }
  