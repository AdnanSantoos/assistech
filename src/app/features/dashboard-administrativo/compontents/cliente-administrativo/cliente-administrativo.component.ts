import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClienteData } from '../../model/cliente.model';
import { RouterModule } from '@angular/router';
import { ClienteAdministrativoService } from './services/cliente-administrativo.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-administrativo',
  templateUrl: './cliente-administrativo.component.html',
  imports: [CommonModule, MatIconModule, RouterModule],
  standalone: true,
  styleUrls: ['./cliente-administrativo.component.scss']
})
export class ClienteAdministrativoComponent implements OnInit {
  public displayedColumns: string[] =['nome', 'cidade', 'pncp', 'portalTransparencia', 'diarioOficial', 'anoInicial', 'proximaEdicao', 'dominio', 'tipo', 'status', 'acoes'];
  public  pageSize = 10;
  public currentPage = 1;
  public totalPages = 5;
  public clientes!:ClienteData[];

  constructor(
    private _service: ClienteAdministrativoService,
    private _location: Location,
  ){}

  ngOnInit() {
    this.getClientes(this.currentPage);
  }
  
  getClientes(page:number){
    this._service.getClientes(page).subscribe((res:RequisicaoModel<ClienteData[]>)=>{
      this.clientes = res.data;
      this.currentPage = res.meta?.pagination.current_page!;
      this.totalPages = res.meta?.pagination.last_page!;
    })
  }

  getStatus(value:boolean){
    return value?'Habilitado':'Desabilitado'
  }

  goBack(): void {
    this._location.back();
  }

  goToPage(page: number) {
    this.getClientes(page);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getClientes(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getClientes(this.currentPage);
    }
  }
}