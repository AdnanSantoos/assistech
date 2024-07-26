import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Slide {
  image: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  allSlides: Slide[] = [
    {
      image: '../../../assets/temporarias/Dia-do-Dentista.jpg',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: '../../../assets/temporarias/dia-do-medico.jpg',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: '../../../assets/temporarias/mpba.jpeg',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: '../../../assets/temporarias/publicitario-1.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: '../../../assets/temporarias/vitiligo.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: '../../../assets/temporarias/Servidor-Publico-dia.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    }
  ];

  slides: Slide[] = [];
  currentSlide = 0;

  constructor() {
    this.slides = this.getRandomSlides(this.allSlides, 5);
  }

  getRandomSlides(slidesArray: Slide[], numSlides: number): Slide[] {
    let shuffled = slidesArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSlides);
  }

  setSlide(index: number) {
    this.currentSlide = index;
  }
}
