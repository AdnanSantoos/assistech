import { GeneralNewsComponent } from './../../shared/components/general-news/general-news.component';
import { Component } from '@angular/core';
import { SliderComponent } from '../../shared/components/slider/slider.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, GeneralNewsComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  images = [
    { img:'../../../../assets/imgs-home/1.png' },
    { img:'../../../../assets/imgs-home/2.png' },
    { img:'../../../../assets/imgs-home/3.png' },
    { img:'../../../../assets/imgs-home/4.png' },
  ]

  images2 = [
    { img:'../../../../assets/imgs-home/5.png' },
    { img:'../../../../assets/imgs-home/6.png' },
    { img:'../../../../assets/imgs-home/7.png' },
  ]
}
