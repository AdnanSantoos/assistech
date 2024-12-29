import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClienteData } from '../../model/cliente.model';
import { RouterModule } from '@angular/router';
import { ClienteAdministrativoService } from './services/cliente-administrativo.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { Location } from '@angular/common';

export enum GovernmentBody {
  HouseOfRepresentatives = 'house_of_representatives',
  FederalSenate = 'federal_senate',
  StateGovernmentPalace = 'state_government_palace',
  LegislativeAssembly = 'legislative_assembly',
  CityHall = 'city_hall',
  CityCouncil = 'city_council',
  Ministries = 'ministries',
  Court = 'court',
  StateDepartment = 'state_department',
  MunicipalDepartment = 'municipal_department',
  Company = 'company',
  Other = 'other',
}

const governmentBodyLabels: Record<GovernmentBody, string> = {
  [GovernmentBody.HouseOfRepresentatives]: 'Câmara dos Deputados',
  [GovernmentBody.FederalSenate]: 'Senado Federal',
  [GovernmentBody.StateGovernmentPalace]: 'Palácio do Governo Estadual',
  [GovernmentBody.LegislativeAssembly]: 'Assembleia Legislativa',
  [GovernmentBody.CityHall]: 'Prefeitura',
  [GovernmentBody.CityCouncil]: 'Câmara Municipal',
  [GovernmentBody.Ministries]: 'Ministérios',
  [GovernmentBody.Court]: 'Tribunal',
  [GovernmentBody.StateDepartment]: 'Secretaria Estadual',
  [GovernmentBody.MunicipalDepartment]: 'Secretaria Municipal',
  [GovernmentBody.Company]: 'Empresa',
  [GovernmentBody.Other]: 'Outro',
};
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
      console.log(res.data)
      this.clientes = res.data;
      this.currentPage = res.meta?.pagination.current_page!;
      this.totalPages = res.meta?.pagination.last_page!;
    })
  }
  getGovernmentBodyLabel(key: string): string {
    return governmentBodyLabels[key as GovernmentBody] || 'Desconhecido';
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
