import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post.model';
@Injectable({
  providedIn: 'root',
})
export class GeneralNewsService {
  private apiUrl =
    'https://api-staging.assistechpublicacoes.com.br/v1/public/news';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>(this.apiUrl).pipe(
      map((response) =>
        response.data.map((post) => ({
          ...post,
          slug: this.generateSlug(post.title),
          formattedDate: new Date(post.date).toLocaleDateString('pt-BR'),
        }))
      )
    );
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
