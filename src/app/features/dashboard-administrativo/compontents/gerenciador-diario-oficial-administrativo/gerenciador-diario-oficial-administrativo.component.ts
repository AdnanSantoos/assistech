import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GerenciadorDiarioOficialService } from './service/gerenciador-diario-oficial.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { DiarioOficialPublicacoes } from './models/gerenciador-diario-oficial.model';
import { TenantService } from '../../../../shared/services/tenant.service';

@Component({
  selector: 'app-gerenciador-diario-oficial-administrativo',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIcon, TooltipModule],
  templateUrl: './gerenciador-diario-oficial-administrativo.component.html',
  styleUrls: ['./gerenciador-diario-oficial-administrativo.component.scss'],
})
export class GerenciadorDiarioOficialAdministrativoComponent implements OnInit{
  public documents:DiarioOficialPublicacoes[]  = [];

  public currentPage = 1;
  public totalPages = 5;
  public isStaff : boolean | null = null;

  constructor(
    private _location: Location,
    private _service: GerenciadorDiarioOficialService,
    public tenantService:TenantService)
    { 
      this.tenantService.isStaff$.subscribe(v=>{
        this.isStaff = v;
      })
    }

  ngOnInit(): void {
   this.getDiario(this.currentPage);
   
  }

  getDiario(page:number){
    this._service.getDashboard(page).subscribe((res:RequisicaoModel<DiarioOficialPublicacoes[]>)=>{
      this.documents = res.data;
      this.currentPage = res.meta?.pagination.current_page!;
      this.totalPages = res.meta?.pagination.last_page!;
    })
  }

  goBack(): void {
    this._location.back();
  }

  goToPage(page: number) {
    this.getDiario(page);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDiario(this.currentPage);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getDiario(this.currentPage);
    }
  }
}
