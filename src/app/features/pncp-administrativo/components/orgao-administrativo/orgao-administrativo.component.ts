import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orgao-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './orgao-administrativo.component.html',
  styleUrls: ['./orgao-administrativo.component.scss'],
})
export class OrgaoAdministrativoComponent {
  constructor(private location: Location) {}
  goBack(): void {
    this.location.back();
  }
  documents = [
    { numSeq: '1', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '2', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '3', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '4', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '5', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '6', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '7', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '8', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
    { numSeq: '9', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01' },
  ];
}
