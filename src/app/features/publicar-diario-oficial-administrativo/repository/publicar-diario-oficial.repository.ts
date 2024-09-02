import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  PublicarDiarioOficialModel,
  PublicarDiarioOficialResponse,
} from './../models/publicar-diario-oficial.model';

@Injectable({
  providedIn: 'root',
})
export class PublicarDiarioOficialRepository {
  constructor(private _http: HttpClient) {}

  publicarDiarioOficial(
    form: PublicarDiarioOficialModel
  ): Observable<PublicarDiarioOficialResponse> {
    const formData = new FormData();

    // Verifique se os campos estão presentes antes de adicionar ao formData
    if (form.ataDaSessao) {
      formData.append('ataDaSessao', form.ataDaSessao);
    }
    if (form.day) {
      formData.append('day', form.day);
    }
    if (form.month) {
      formData.append('month', form.month);
    }
    if (form.year) {
      formData.append('year', form.year);
    }
    if (form.file && form.file.name) {
      formData.append('file', form.file, form.file.name);
    }

    return this._http
      .post<PublicarDiarioOficialResponse>(
        `${environment.apiUrl}/${environment.tenant}/diario-oficial/official-gazettes`,
        formData
      )
      .pipe(
        // Tratamento de erros específicos
        catchError((err) => {
          console.error('Erro ao publicar diário oficial:', err);
          return throwError(() => err); // Propaga o erro para o serviço
        })
      );
  }
}
