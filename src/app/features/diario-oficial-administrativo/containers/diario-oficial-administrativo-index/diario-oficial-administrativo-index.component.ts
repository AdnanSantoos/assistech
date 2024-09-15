import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-diario-oficial-administrativo-index',
  standalone:true,
  templateUrl: './diario-oficial-administrativo-index.component.html',
  styleUrls: ['./diario-oficial-administrativo-index.component.scss'],
  imports:[RouterModule]
})
export class DiarioOficialAdministrativoIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
