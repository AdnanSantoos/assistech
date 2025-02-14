import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from '../general-news/general-news-detalhes/general-news-detalhes-service/general-news-detalhes-service.service';
import { Post } from '../general-news/model/post.model';
import { CommonModule } from '@angular/common';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss'],
})
export class LatestNewsComponent implements OnInit {
  posts: Post[] = [];
  marqueeText: string = '';
  currentIndex: number = 0;

  constructor(private router: Router,private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.noticiasService.getLatestNews().subscribe(
      (data: any) => {
        this.posts = data.data;
        this.updateMarqueeText();
      },
      (error) => {
        console.error('Erro ao carregar as notícias:', error);
        this.posts = [];
        this.marqueeText = 'Nenhuma notícia disponível';
      }
    );
  }

  updateMarqueeText() {
    if (this.posts.length > 0) {
      this.marqueeText = this.posts.map((post) => post.title).join(' • ');
    } else {
      this.marqueeText = 'Nenhuma notícia disponível';
    }
  }

  goToCurrentNews() {
    const currentPost = this.posts[this.currentIndex];
    if (currentPost && currentPost.slug) {
      this.router.navigate(['/noticia-detalhe', currentPost.slug]);
    } else {
      console.warn('Slug não encontrado para a notícia atual:', currentPost);
      this.marqueeText = 'Slug não encontrado para a notícia atual';
    }
  }

  nextNews() {
    this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    this.updateMarqueeText();
  }
}
