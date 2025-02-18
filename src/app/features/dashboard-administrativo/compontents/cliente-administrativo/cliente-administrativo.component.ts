import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClienteData } from '../../model/cliente.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClienteAdministrativoService } from './services/cliente-administrativo.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { Location } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatTooltipModule
  ],
  standalone: true,
  styleUrls: ['./cliente-administrativo.component.scss']
})

export class ClienteAdministrativoComponent implements OnInit {
  public displayedColumns: string[] = [
    'nome', 'cidade', 'pncp', 'portalTransparencia',
    'diarioOficial', 'anoInicial', 'proximaEdicao',
    'dominio', 'tipo', 'status', 'acoes'
  ];
  public pageSize = 10;
  public currentPage = 1;
  public totalPages = 5;
  public clientes: ClienteData[] = [];
  public allData: ClienteData[] = [];
  isLoading = false;

  filterForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    domain: new FormControl(''),
    governmentBody: new FormControl('all'),
    status: new FormControl('all'),
    services: new FormControl('all')
  });

  constructor(
    private _service: ClienteAdministrativoService,
    private _location: Location,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAllPages();
  }

  async loadAllPages(): Promise<void> {
    this.isLoading = true;
    try {
      const firstPage = await this._service.getClientes(1).toPromise();
      if (!firstPage) return;

      let allData: ClienteData[] = [...firstPage.data];
      this.totalPages = firstPage.meta?.pagination.last_page || 1;

      if (this.totalPages > 1) {
        const remainingPages = Array.from(
          { length: this.totalPages - 1 },
          (_, i) => i + 2
        );

        const promises = remainingPages.map(page =>
          this._service.getClientes(page).toPromise()
        );

        const results = await Promise.all(promises);
        results.forEach(result => {
          if (result?.data) {
            allData = [...allData, ...result.data];
          }
        });
      }

      this.allData = allData;
      this.clientes = allData;
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    const formValues = this.filterForm.value;
    let filteredData = [...this.allData];

    if (formValues.name) {
      filteredData = filteredData.filter(item =>
        item.name?.toLowerCase().includes(formValues.name?.toLowerCase() || '')
      );
    }

    if (formValues.city) {
      filteredData = filteredData.filter(item =>
        item.city_name?.toLowerCase().includes(formValues.city?.toLowerCase() || '')
      );
    }

    if (formValues.domain) {
      filteredData = filteredData.filter(item =>
        item.domain?.toLowerCase().includes(formValues.domain?.toLowerCase() || '')
      );
    }

    if (formValues.governmentBody && formValues.governmentBody !== 'all') {
      filteredData = filteredData.filter(item =>
        item.government_body === formValues.governmentBody
      );
    }

    if (formValues.status && formValues.status !== 'all') {
      filteredData = filteredData.filter(item =>
        formValues.status === 'active' ? item.is_active : !item.is_active
      );
    }

    if (formValues.services && formValues.services !== 'all') {
      filteredData = filteredData.filter(item => {
        switch (formValues.services) {
          case 'diario':
            return item.diario_oficial;
          case 'pncp':
            return item.pncp;
          case 'transparencia':
            return item.portal_transparencia;
          default:
            return true;
        }
      });
    }

    this.clientes = filteredData;
  }

  clearFilters(): void {
    this.filterForm.reset({
      name: '',
      city: '',
      domain: '',
      governmentBody: 'all',
      status: 'all',
      services: 'all'
    });
    this.clientes = this.allData;
  }

  getGovernmentBodyLabel(key: string): string {
    return governmentBodyLabels[key as GovernmentBody] || 'Desconhecido';
  }

  getStatus(value: boolean) {
    return value ? 'Habilitado' : 'Desabilitado';
  }

  goBack(): void {
    this._location.back();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
