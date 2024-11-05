import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { NewsService } from './general-news-detalhes-service/general-news-detalhes-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-news-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-news-detalhes.component.html',
  styleUrl: './general-news-detalhes.component.scss'
})
export class GeneralNewsDetalhesComponent implements OnInit {
  postTitle: string | null = '';
  post: Post | null = null;

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Captura o parâmetro 'title' da rota
    this.postTitle = this.route.snapshot.paramMap.get('title');

    if (this.postTitle) {
      this.newsService.getNews().subscribe({
        next: (newsList: Post[]) => {
          const normalizedTitle = (str: string) =>
            str.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');

          // Encontra o post que corresponde ao título
          this.post = newsList.find(item => normalizedTitle(item.title) === this.postTitle) ?? null;

          if (!this.post) {
            console.error('Post não encontrado');
          }
        },
        error: (error) => {
          console.error('Erro ao carregar os dados:', error);
        }
      });
    }
  }
}
