import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { ExibirClienteData } from '../../../features/dashboard-administrativo/model/cliente.model';
import { CommonModule } from '@angular/common';
import { TenantFullModel } from '../../models/shared.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  clienteData?: ExibirClienteData;
  clienteAddress?: ExibirClienteData['address'];
  isAdmRoute = false;
  clienteName = '';

  constructor(
    private location: Location,
    private tenantService: TenantService
  ) {}

  ngOnInit() {
    this.checkRoute(this.location.path());
    this.loadTenantData();
  }

  private loadTenantData(): void {
    const tenant = this.tenantService.getTenant();
    console.log('Tenant obtido:', tenant);

    if (!tenant || this.isAdmRoute) {
      console.log('Tenant não encontrado ou rota administrativa');
      return;
    }

    this.tenantService.getTenantData(tenant).subscribe(
      (response) => {
        console.log('Response completa:', response);

        if (response?.data) {
          const data = response.data;
          this.clienteName = data.name;

          // Mapear os dados para a estrutura ExibirClienteData
          this.clienteData = {
            agencies: [],
            city: {
              code: 0,
              label: data.name,
              state_code: 0,
              uf: ''
            },
            city_name: data.name,
            name: data.name,
            pncp: false,
            portal_transparencia: false,
            diario_oficial: false,
            slug: data.slug,
            state_uf: '',
            year: 0,
            government_body: '',
            file_is_sent_signed: false,
            address: {
              street: data.address?.street || '',
              number: data.address?.number || '',
              complement: data.address?.complement || '',
              district: data.address?.district || '',
              zip: data.address?.zip || ''
            },
            networks: {
              youtube: data.networks?.youtube || '',
              facebook: data.networks?.facebook || '',
              instagram: data.networks?.instagram || '',
              tiktok: data.networks?.tiktok || ''
            }
          };

          this.clienteAddress = this.clienteData.address;

          console.log('Dados processados:', {
            data: this.clienteData,
            address: this.clienteAddress
          });
        }
      },
      (error) => {
        console.error('Erro ao carregar dados:', error);
        this.resetData();
      }
    );
  }

  private checkRoute(url: string): void {
    this.isAdmRoute = url.includes('/adm');
    console.log('Is Admin Route:', this.isAdmRoute);
  }

  private resetData(): void {
    this.clienteData = undefined;
    this.clienteAddress = undefined;
    this.clienteName = '';
  }
}
