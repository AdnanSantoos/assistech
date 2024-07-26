import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-general-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-news.component.html',
  styleUrl: './general-news.component.scss'
})
export class GeneralNewsComponent {
  cards = [
    {
      img: '../../../assets/temporarias/noticia-01.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    },
    {
      img: '../../../assets/temporarias/noticia-02.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    },
    {
      img: '../../../assets/temporarias/noticia-03.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    }
  ];
}