import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-acesso-informacao',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './acesso-informacao.component.html',
  styleUrl: './acesso-informacao.component.scss'
})
export class AcessoInformacaoComponent {
  button = [
    {
      name: 'teste',
      link: 'https://www.google.com.br/'
    }
     
  ]
}
