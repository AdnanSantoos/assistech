import { Component, OnInit } from '@angular/core';
import { Post } from './model/post.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { filter, map, switchMap, tap } from 'rxjs';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-general-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './general-news.component.html',
  styleUrl: './general-news.component.scss',
})
export class GeneralNewsComponent implements OnInit {
  posts: Post[] = [];
  currentSlug: string = '';

  constructor(
    private newsService: NoticiasService,
    private router: Router,
    public route: ActivatedRoute,
    private _tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this._tenantService.slug$
      .pipe(
        filter((slug): slug is string => slug !== null),
        tap(slug => console.log('Slug recebido:', slug)),
        switchMap(slug => {
          this.currentSlug = slug;
          return this.newsService.getLatestNews();
        }),
      )
      .subscribe(
        (data) => {
          this.posts = data.data.map((post:any) => ({
            ...post,
            formattedDate: new Date(post.date).toLocaleDateString('pt-BR')
          }));
        },
        (error) => console.error('Erro ao carregar os dados:', error)
      );
  }

  navigateToNoticia(postSlug: string | undefined) {
    if (!postSlug) return;
    this.router.navigate([this.currentSlug, 'noticia-detalhe', postSlug]);
  }
}
