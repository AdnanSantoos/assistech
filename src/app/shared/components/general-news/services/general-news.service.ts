import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralNewsService {
  private apiUrl = `${environment.API_URL}/public/news`;

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<{ data: Post[] }>(this.apiUrl).pipe(
      map((response) =>
        response.data.map((post) => ({
          ...post,
          formattedDate: new Date(post.date).toLocaleDateString('pt-BR'),
        }))
      )
    );
  }
}
