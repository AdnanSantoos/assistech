import { Injectable } from '@angular/core';
import { NoticiaRepository } from '../repository/cadastrar-noticia.repository';
import { Noticia } from '../models/cadastrar-noticias.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  constructor(
    private noticiaRepository: NoticiaRepository,
    private toastr: ToastrService
  ) {}

  criarNoticia(formData: FormData): Observable<Noticia> {
    return this.noticiaRepository.criarNoticia(formData).pipe(
      tap(() => {
        this.toastr.success('Notícia cadastrada com sucesso!', 'Sucesso');
      }),
      catchError((error) => {
        const errorMessage = error?.error?.message || 'Erro ao cadastrar a notícia.';
        this.toastr.error(errorMessage, 'Erro');
        throw error;
      })
    );
  }

  getNoticias(): Observable<Noticia[]> {
    return this.noticiaRepository.getNoticias().pipe(
      tap(() => {
        this.toastr.success('Notícias carregadas com sucesso!', 'Sucesso');
      }),
      catchError((error) => {
        const errorMessage = error?.error?.message || 'Erro ao carregar as notícias.';
        this.toastr.error(errorMessage, 'Erro');
        throw error;
      })
    );
  }
}
