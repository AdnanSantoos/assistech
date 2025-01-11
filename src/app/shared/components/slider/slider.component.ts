import { Component, OnInit } from '@angular/core';
import { NewsService } from '../general-news/general-news-detalhes/general-news-detalhes-service/general-news-detalhes-service.service';
import { Post } from '../general-news/model/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TenantService } from '../../services/tenant.service';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  posts: Post[] = [];
  currentSlide = 0;
  currentSlug: string = '';

  constructor(
    private newsService: NewsService,
    private _tenantService: TenantService
  ) {}

  ngOnInit(): void {
    this._tenantService.slug$
      .pipe(
        filter((slug): slug is string => slug !== null),
        switchMap((slug) => {
          this.currentSlug = slug;
          return this.newsService.getNews();
        })
      )
      .subscribe(
        (data: Post[]) => {
          this.posts = data;
        },
        (error) => {
          console.error('Erro ao carregar os dados:', error);
        }
      );
  }

  generateSlug(title: string): string {
    if (!title) return '';

    return (
      title
        .toLowerCase()
        // Remove acentos e caracteres especiais
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Remove caracteres especiais e espaços, substituindo por hífen
        .replace(/[^a-z0-9]+/g, '-')
        // Remove hífens do início e fim
        .replace(/^-+|-+$/g, '')
        // Remove hífens duplicados
        .replace(/-{2,}/g, '-')
    );
  }

  getNoticiaRoute(title: string): string[] {
    return ['/', this.currentSlug, 'noticia-detalhe', this.generateSlug(title)];
  }

  getRandomSlides(slidesArray: Post[], numSlides: number): Post[] {
    let shuffled = slidesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSlides);
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}
