import { Component, OnInit } from '@angular/core';
import { GeneralNewsService } from './services/general-news.service';
import { Post } from './model/post.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { filter, switchMap, tap } from 'rxjs';

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
    private newsService: GeneralNewsService,
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
          return this.newsService.getPosts();
        })
      )
      .subscribe(
        (data) => {
          this.posts = data;
        },
        (error) => console.error('Erro ao carregar os dados:', error)
      );
  }

  navigateToNoticia(postSlug: string | undefined) {
    if (!postSlug) return;
    this.router.navigate(['/app',this.currentSlug, 'noticia-detalhe', postSlug]);
  }
}
