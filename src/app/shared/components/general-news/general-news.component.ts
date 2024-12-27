import { Component, OnInit } from '@angular/core';
import { GeneralNewsService } from './services/general-news.service';
import { Post } from './model/post.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-general-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './general-news.component.html',
  styleUrl: './general-news.component.scss'
})
export class GeneralNewsComponent implements OnInit {
  posts: Post[] = [];

  constructor(private newsService: GeneralNewsService) { }

  ngOnInit(): void {
    this.newsService.getPosts().subscribe(
      data => { this.posts = data},
      error => console.error('Erro ao carregar os dados:', error)
    );
  }
}
