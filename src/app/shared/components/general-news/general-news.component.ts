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
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    },
    {
      img: 'https://i.postimg.cc/wjDGwZf1/1400500.png',
      data: 'xx/xx/xxx',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      subtitle: 'Lorem ipsum dolor',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, omnis similique? Eius placeat molestias explicabo voluptatibus sequi ad, voluptate veritatis voluptatum delectus voluptas praesentium nesciunt perferendis consequatur esse distinctio eveniet?'
    }
  ];
}