import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../general-news/model/post.model';
import { NewsService } from '../general-news/general-news-detalhes/general-news-detalhes-service/general-news-detalhes-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  allSlides: Post[] = [];
  slides: Post[] = [];
  currentSlide = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.newsService.getNews().subscribe({
      next: (news: Post[]) => {
        // Mapeando cada item para incluir as propriedades obrigatórias do modelo Post
        this.allSlides = news.map((item) => ({
          author: item.author || 'Autor desconhecido',
          title: item.title,
          date: item.date || '',
          image_url: item.image_url,
          image_label: item.image_label || '',
          category: item.category || 'Sem categoria',
          comments: item.comments || 0,
          content: item.content || '',
          slug: item.slug || '',
          formattedDate: item.formattedDate || ''
        }));

        // Selecionando slides aleatórios
        this.slides = this.getRandomSlides(this.allSlides, 5);
      },
      error: (err) => {
        console.error('Erro ao carregar as notícias:', err);
      }
    });
  }

  getRandomSlides(slidesArray: Post[], numSlides: number): Post[] {
    let shuffled = slidesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSlides);
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}
