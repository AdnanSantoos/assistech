import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://api-staging.assistechpublicacoes.com.br/v1/public/news';

  constructor(private http: HttpClient) {}

  getNews(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }
}
