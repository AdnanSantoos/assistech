import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { NewsService } from './general-news-detalhes-service/general-news-detalhes-service.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private newsService: NewsService, private route: ActivatedRoute,private _toastService:ToastrService) {}

  ngOnInit(): void {
    // Captura o parâmetro 'title' da rota
    this.postTitle = this.route.snapshot.paramMap.get('title');
    if (this.postTitle) {
      this.newsService.getNewsPerTitle(this.postTitle).subscribe({
        next: (newsList: Post) => {
          console.log(newsList)
          this.post = newsList;
          if (!this.post) {
            this._toastService.error('Post não encontrado')
          }
        }
      });
    }
  }
}
