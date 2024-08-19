import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DiarioOficial } from '../models/diario-oficial.model';
@Injectable({
  providedIn: 'root',
})
export class DiarioRepository {
  constructor(private _http: HttpClient) {}
  //Inicio - De acordo com swagger diario oficial/publicações
  getDiarioPublicacoes() {
    return this._http.get(
      `${environment.apiUrl}/${environment.tenant}/diario-oficial/official-gazettes/${environment.tenant}`
    );
  }
  //Final - De acordo com swagger diario oficial/publicações



  //Inicio - De acordo com swagger diario oficial/público
  getDiarioPublicoOficial() {
    return this._http.get(
      `${environment.apiUrl}/${environment.tenant}/official-gazettes/${environment.tenant}`
    );
  }

  getDiarioPublico() {
    return this._http.get(`${environment.apiUrl}/public`);
  }

  getDiarioPublicoEntidade() {
    return this._http.get(`${environment.apiUrl}/public/${environment.tenant}`);
  }
  //Final - De acordo com swagger diario oficial/público
}
