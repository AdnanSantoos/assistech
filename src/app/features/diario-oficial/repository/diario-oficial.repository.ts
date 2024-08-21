import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { DiarioOficialPublico } from '../models/diario-oficial.model';
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
  getDiarioPublicoPorData(ano:string,mes:number) {
    return this._http.get(`${environment.apiUrl}/public/admin/official-gazettes?year=${ano}&month=${mes}`);
  }

  getDiarioPublico() {
    return this._http.get<DiarioOficialPublico>(`${environment.apiUrl}/public/${environment.tenant}`);
  }

  getDiarioPublicoEntidade() {
    return this._http.get(`${environment.apiUrl}/public/${environment.tenant}`);
  }
  //Final - De acordo com swagger diario oficial/público
}
