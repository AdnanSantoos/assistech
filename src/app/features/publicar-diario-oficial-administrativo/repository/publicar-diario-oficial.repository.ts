import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PublicarDiarioOficialModel, PublicarDiarioOficialResponse } from './../models/publicar-diario-oficial.model';

@Injectable({
  providedIn: 'root'
})
export class PublicarDiarioOficialRepository {

  constructor(private _http: HttpClient) {}

  publicarDiarioOficial(form: PublicarDiarioOficialModel): Observable<PublicarDiarioOficialResponse> {
    const formData = new FormData();
    formData.append('ataDaSessao', form.ataDaSessao);
    formData.append('day', form.day);
    formData.append('month', form.month);
    formData.append('year', form.year);
    formData.append('file', form.file, form.file.name);

    return this._http.post<PublicarDiarioOficialResponse>(`${environment.apiUrl}/${environment.tenant}/diario-oficial/official-gazettes`, formData);
  }
}
