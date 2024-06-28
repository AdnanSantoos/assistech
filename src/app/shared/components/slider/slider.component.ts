import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  slides = [
    {
      image: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    },
    {
      image: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      title: 'Dia do Médico Dermatologista',
      description: 'Sem pretender diminuir a importância de um generalista ou clínico geral bom, no entanto, é necessário destacar a imprescindibilidade dos especialistas. E hoje é dia do Médico Dermatologista. Derme: Pele – Logia: Estudo.'
    }
  ];
  currentSlide = 0;

  setSlide(index: number) {
    this.currentSlide = index;
  }
}