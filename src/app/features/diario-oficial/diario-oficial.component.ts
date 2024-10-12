import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiarioOficialService } from './services/diario-oficial.service';
import { DiarioOficialPublico } from './models/diario-oficial.model';
import { selectModel } from '../../shared/models/shared.model';
import { NgSelectModule } from '@ng-select/ng-select';
@Component({
  selector: 'app-diario-oficial',
  standalone: true,
  imports: [CommonModule, RouterLink,NgSelectModule],
  templateUrl: './diario-oficial.component.html',
  styleUrl: './diario-oficial.component.scss'
})
export class DiarioOficialComponent implements OnInit {

  listaAnos!: number[];
  meses:selectModel[] = [
    { key: "Janeiro", value: 1 },
    { key: "Fevereiro", value: 2 },
    { key: "Março", value: 3 },
    { key: "Abril", value:4 },
    { key: "Maio", value: 5 },
    { key: "Junho", value: 6 },
    { key: "Julho", value: 7 },
    { key: "Agosto", value: 8 },
    { key: "Setembro", value: 9 },
    { key: "Outubro", value: 10 },
    { key: "Novembro", value: 11 },
    { key: "Dezembro", value: 12 }
  ]

  constructor(private diarioOficialService: DiarioOficialService) { }

  ngOnInit(): void {
   
  }

}
