import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pncp-administrativo-index',
  templateUrl: './pncp-administrativo-index.component.html',
  standalone:true,
  imports:[RouterModule],
  styleUrls: ['./pncp-administrativo-index.component.scss']
})
export class PncpAdministrativoIndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
