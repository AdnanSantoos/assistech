import { Injectable } from '@angular/core';
import { Noticia } from '../models/cadastrar-noticias.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoticiaRepository } from '../repository/cadastrar-noticia.repository';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  constructor(private noticiaRepository: NoticiaRepository) { }

  listarNoticias(filtros?: { titulo?: string; dataInicio?: string; dataFim?: string }): Observable<Noticia[]> {
    return this.noticiaRepository.listarNoticiasPorFiltro(filtros).pipe(
      map(response => response.data)
    );
  }

  criarNoticia(noticia: Noticia): Observable<Noticia> {
    return this.noticiaRepository.criarNoticia(noticia).pipe(
      map(response => response.data)
    );
  }

  criarNoticiaComImagem(formData: FormData): Observable<Noticia> {
    return this.noticiaRepository.criarNoticiaComImagem(formData);
  }

  atualizarNoticia(newsId: number, noticia: Noticia): Observable<Noticia> {
    return this.noticiaRepository.atualizarNoticia(newsId, noticia).pipe(
      map(response => response.data)
    );
  }

  excluirNoticia(newsId: number): Observable<void> {
    return this.noticiaRepository.excluirNoticia(newsId).pipe(
      map(() => void 0)
    );
  }
}
