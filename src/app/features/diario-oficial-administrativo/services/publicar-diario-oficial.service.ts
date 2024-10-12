// src/app/services/publicar-diario-oficial.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicarDiarioOficialRepository } from '../repository/publicar-diario-oficial.repository';
import {
  PublicarDiarioOficialModel,
  PublicarDiarioOficialResponse,
} from './../models/publicar-diario-oficial.model';

@Injectable({
  providedIn: 'root',
})
export class PublicarDiarioOficialService {
  constructor(
    private _repository: PublicarDiarioOficialRepository,
    private _router: Router,
    private _toastr: ToastrService
  ) { }

  public publicarDiarioOficial(form: FormData) {
    this._repository.publicarDiarioOficial(form).subscribe({
      next: (response: PublicarDiarioOficialResponse) => {
        this._toastr.success(
          response.message || 'Publicação realizada com sucesso!',
          'Sucesso'

        );
      },
      error: (err: any) => {
        const errorMessage = err?.error?.message || 'Ocorreu um erro!';
        this._toastr.error(errorMessage, 'Erro');
      },
    });
  }
}
