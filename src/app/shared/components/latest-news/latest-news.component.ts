import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent {
  fullTexts: string[] = [
    '001 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    '002 - Quisque at erat eu libero consequat tempus.',
    '003 - Nullam vehicula ipsum a arcu cursus vitae.'
  ];

  marqueeText: string = this.fullTexts[0];
  currentIndex: number = 0;

  nextNews() {
    this.currentIndex = (this.currentIndex + 1) % this.fullTexts.length;
    this.marqueeText = this.fullTexts[this.currentIndex];
  }

  goToNews() {
    switch(this.currentIndex) {
      case 0:
        alert("Navigate to News 1");
        break;
      case 1:
        alert("Navigate to News 2");
        break;
      case 2:
        alert("Navigate to News 3");
        break;
    }
  }
}