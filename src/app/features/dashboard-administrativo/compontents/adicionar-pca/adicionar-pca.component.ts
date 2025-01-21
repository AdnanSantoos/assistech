import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import {
  OrgaoModel,
  SelectedAgencies,
} from '../orgao-administrativo/model/orgao-administrativo.model';
import { selectModel } from '../../../../shared/models/shared.model';
import { AdicionarLicitacaoService } from '../../../pncp-administrativo/components/dados-da-licitacao-administrativo/service/adicionar-licitacao.services';
import { TenantService } from '../../../../shared/services/tenant.service';
import { ContractPlanService } from '../pca-administrativo/service/pca.service';
import { ContractPlanModel } from '../pca-administrativo/model/pca.model';

@Component({
  selector: 'app-adicionar-pca',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent,
    NgSelectModule,
  ],
  templateUrl: './adicionar-pca.component.html',
  styleUrls: ['./adicionar-pca.component.scss'],
})
export class AdicionarPcaComponent {
  pcaForm!: FormGroup;
  agencyOptions: SelectedAgencies[] = [];
  unitOptions: selectModel[] = [];
  cnpjSelecionado!: string;
  orgaos: OrgaoModel[] = [];

  categoriaItem = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
    { value: 3, key: 'Obras' },
    { value: 4, key: 'Serviços de Engenharia' },
    { value: 5, key: 'Soluções de TIC' },
    { value: 6, key: 'Locação de Imóveis' },
    { value: 7, key: 'Alienação/Concessão/Permissão' },
    { value: 8, key: 'Obras e Serviços de Engenharia' },
  ];

  categoriaMaterialServico = [
    { value: 1, key: 'CNBS (Catálogo Nacional de Bens e Serviços)' },
    { value: 2, key: 'Outros' },
  ];

  MaterialOuServico = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
  ];

  constructor(
    private fb: FormBuilder,
    private _adicionarLicitacaoService: AdicionarLicitacaoService,
    private _contractPlanService: ContractPlanService,
    private _toastr: ToastrService,
    private _tenantService: TenantService
  ) {
    this.initForm();
    this.loadCurrentUser();
    this.setupTenantSubscription();
    this.loadOrgaos();
  }

  private initForm(): void {
    this.pcaForm = this.fb.group({
      tenant_slug: [this._tenantService.getTenant()],
      agency_country_register: ['', Validators.required],
      unit_id: ['', Validators.required],
      year: ['', Validators.required],
      created_by_id: [''],
      items: this.fb.group({
        item_number: [1, Validators.required],
        item_category_id: ['', Validators.required],
        catalog: ['', Validators.required],
        catalog_classification: ['', Validators.required],
        superior_classification_code: ['', Validators.required],
        superior_classification_name: ['', Validators.required],
        pdm_code: [''],
        pdm_description: [''],
        item_code: ['', Validators.required],
        description: ['', Validators.required],
        supply_unit: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.min(1)]],
        unit_value: ['', [Validators.required, Validators.min(0)]],
        total_value: ['', [Validators.required, Validators.min(0)]],
        budget_value_for_year: ['', [Validators.required, Validators.min(0)]],
        desired_date: ['', Validators.required],
        requesting_unit: [''],
        contracting_group_code: [''],
        contracting_group_name: [''],
        contract_renewal: [false],
      }),
    });

    // Setup agency selection listener
    this.pcaForm
      .get('agency_country_register')
      ?.valueChanges.subscribe((selectedAgencyId: string) => {
        const selectedAgency = this.orgaos.find(
          (org) => org.country_register === selectedAgencyId
        );

        if (selectedAgency) {
          this.unitOptions = selectedAgency.units.map((unit) => ({
            key: unit.name,
            value: unit.id,
          }));
        } else {
          this.unitOptions = [];
        }

        this.pcaForm.get('unit_id')?.setValue('');
      });
  }

  private loadCurrentUser(): void {
    const currentTenant = this._tenantService.getTenant();
    if (currentTenant) {
      this._tenantService.getDados(currentTenant).subscribe({
        next: (response) => {
          if (response.data?.id) {
            this.pcaForm.patchValue({
              created_by_id: response.data.id,
            });
          }
        },
        error: () => {
          this._toastr.error('Erro ao carregar dados do usuário');
        },
      });
    }
  }

  private setupTenantSubscription(): void {
    this._tenantService.slug$.subscribe((slug) => {
      if (slug) {
        this.pcaForm.patchValue({ tenant_slug: slug });
        this.loadCurrentUser();
      }
    });
  }

  loadOrgaos(): void {
    this._adicionarLicitacaoService.getOrgaos().subscribe({
      next: (response: any) => {
        this.orgaos = response.data;
        this.agencyOptions = this.orgaos.map((orgao) => ({
          value: orgao.country_register,
          label: orgao.name,
          unit: orgao.units,
        }));
        this.unitOptions = [];
      },
      error: () => {
        this._toastr.error('Erro ao carregar órgãos');
      },
    });
  }

  onFormSubmit(): void {
    if (this.pcaForm.valid) {
      const formValue = this.pcaForm.value;
      const currentSlug = this._tenantService.getTenant();

      // Verifica se temos um tenant_slug válido
      if (!currentSlug) {
        return;
      }

      // Montando o objeto com a tipagem correta
      const contractPlanData: ContractPlanModel = {
        tenant_slug: currentSlug,
        agency_country_register: formValue.agency_country_register,
        unit_id: formValue.unit_id,
        year: Number(formValue.year),
        created_by_id: formValue.created_by_id,
        items: [formValue.items],
      };

      this._contractPlanService.createContractPlan(contractPlanData).subscribe({
        next: () => {},
        error: (error) => {
          console.error('Erro:', error);
        },
      });
    } else {
      this.markFormGroupTouched(this.pcaForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Métodos auxiliares para validação de campos
  isFieldInvalid(controlName: string): boolean {
    const control = this.pcaForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getFieldError(controlName: string): string {
    const control = this.pcaForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['min']) return 'Valor deve ser maior que zero';
      // Adicione mais mensagens de erro conforme necessário
    }
    return '';
  }
}
