// src/app/services/publicar-diario-oficial.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicarDiarioOficialRepository } from '../repository/publicar-diario-oficial.repository';
import { PublicarDiarioOficialModel, PublicarDiarioOficialResponse } from './../models/publicar-diario-oficial.model';

@Injectable({
  providedIn: 'root',
})
export class PublicarDiarioOficialService {
  constructor(
    private _repository: PublicarDiarioOficialRepository,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  public publicarDiarioOficial(form: PublicarDiarioOficialModel) {
    this._repository.publicarDiarioOficial(form).subscribe({
      next: (response: PublicarDiarioOficialResponse) => {
        if (response.success) {
          this._toastr.success(response.message, 'Publicação realizada com sucesso!');
          // this._router.navigate(['']);
        } else {
          this._toastr.error(response.message, 'Falha na publicação');
        }
      },
      error: (err: any) => {
        this._toastr.error(err.error.message || 'Ocorreu um erro!', 'Ocorreu um erro!');
      },
    });
  }
}
