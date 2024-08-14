import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-unidades-administrativo',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './unidades-administrativo.component.html',
  styleUrl: './unidades-administrativo.component.scss'
})
export class UnidadesAdministrativoComponent {
  documents = [
    { numSeq: '1', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '2', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '3', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '4', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '5', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '6', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '7', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '8', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' },
    { numSeq: '9', nome: 'CAMARA DE ITABERABA', cnpj: '123.456.890/0001-01', cdgIBGE:'2930709', cdgUND:'1201' }
  ];
}

