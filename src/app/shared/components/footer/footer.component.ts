import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TenantService } from '../../services/tenant.service';
import { TenantFullModel, TenantAddressModel } from '../../models/shared.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  clienteData!: TenantFullModel; // Dados completos do cliente
  clienteAddress!: TenantAddressModel; // Apenas o endereço do cliente
  isAdmRoute = false;
  clienteName!: string;
  checkRoute(url: string) {
    this.isAdmRoute = url.includes('/adm');
  }

  constructor(
    private location: Location,
    private tenantService: TenantService
  ) {
    const currentUrl = this.location.path();
    this.checkRoute(currentUrl);

    this.tenantService.state$.subscribe(
      (tenantData: TenantFullModel | null) => {
        if (tenantData) {
          this.clienteData = tenantData;
          this.clienteAddress =
            Array.isArray(tenantData.address) && tenantData.address.length > 0
              ? tenantData.address[0] // Obtém o primeiro endereço caso seja um array
              : null;
          this.clienteName = tenantData.name; // Obtém o nome
        } else {
          this.clienteData = null!;
          this.clienteAddress = null!;
          this.clienteName = null!;
        }
      }
    );
  }
}
