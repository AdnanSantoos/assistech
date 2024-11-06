import { Component, OnInit } from '@angular/core';
import { NewsService } from '../general-news/general-news-detalhes/general-news-detalhes-service/general-news-detalhes-service.service';
import { Post } from '../general-news/model/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  posts: Post[] = [];
  currentSlide = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe(
      (data: Post[]) => {
        this.posts = data;  // Atribui os dados da API à variável posts
      },
      (error) => {
        console.error('Erro ao carregar os dados:', error);
      }
    );
  }

  // Função para gerar o slug a partir do título
  generateSlug(title: string): string {
    return title.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '');
  }

  getRandomSlides(slidesArray: Post[], numSlides: number): Post[] {
    let shuffled = slidesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSlides);
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}
