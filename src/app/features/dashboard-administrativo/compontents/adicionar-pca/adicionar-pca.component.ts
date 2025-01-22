import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import {
  ContractPlanItemModel,
  ContractPlanModel,
} from '../pca-administrativo/model/pca.model';
import { CurrencyMaskDirective } from '../../../../shared/directives/currencyMask.directive';
import { finalize } from 'rxjs/operators';
interface SelectOption {
  value: number;
  key: string;
}
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
    CurrencyMaskDirective,
  ],
  templateUrl: './adicionar-pca.component.html',
  styleUrls: ['./adicionar-pca.component.scss'],
})
export class AdicionarPcaComponent implements OnInit {
  pcaForm!: FormGroup;
  agencyOptions: SelectedAgencies[] = [];
  unitOptions: selectModel[] = [];
  cnpjSelecionado!: string;
  orgaos: OrgaoModel[] = [];
  isEditMode = false;
  contractPlanId: string | null = null;
  isLoading = false;
  loadedItemId: string | null = null;

  categoriaItem: SelectOption[] = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
    { value: 3, key: 'Obras' },
    { value: 4, key: 'Serviços de Engenharia' },
    { value: 5, key: 'Soluções de TIC' },
    { value: 6, key: 'Locação de Imóveis' },
    { value: 7, key: 'Alienação/Concessão/Permissão' },
    { value: 8, key: 'Obras e Serviços de Engenharia' },
  ];
  modeloCatalogo: SelectOption[] = [
    { value: 1, key: 'CNBS (Catálogo Nacional de Bens e Serviços)' },
    { value: 2, key: 'Outros' },
  ];
  catalogoClassificacao: SelectOption[]  = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
  ];
  bensCategoria: SelectOption[] = [
    { value: 1, key: 'Bens imóveis' },
    { value: 2, key: 'Bens móveis' },
    { value: 3, key: 'Não se aplica' },
  ];
  constructor(
    private fb: FormBuilder,
    private _adicionarLicitacaoService: AdicionarLicitacaoService,
    private _contractPlanService: ContractPlanService,
    private _toastr: ToastrService,
    private _tenantService: TenantService,
    private _route: ActivatedRoute
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.setupTenantSubscription();
    this.loadOrgaos();

    // Check if we're in edit mode
    this._route.paramMap.subscribe((params) => {
      this.contractPlanId = params.get('id');

      if (this.contractPlanId) {
        this.isEditMode = true;
        this.loadContractPlanDetails();
      }
    });
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

  private loadContractPlanDetails(): void {
    if (!this.contractPlanId) return;

    this.isLoading = true;
    this._contractPlanService
      .getContractPlanById(this.contractPlanId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.data) {
            this.populateFormWithExistingData(response.data);
          }
        },
        error: () => {
          this._toastr.error(
            'Erro ao carregar detalhes do plano de contrato',
            'Erro'
          );
        },
      });
  }

  private populateFormWithExistingData(contractPlan: ContractPlanModel): void {
    // Populate main form fields
    this.pcaForm.patchValue({
      agency_country_register: contractPlan.agency_country_register,
      unit_id: contractPlan.unit_id,
      year: contractPlan.year,
      created_by_id: contractPlan.created_by_id,
    });

    // Populate items form (assuming the first item, adjust if multiple items are possible)
    if (contractPlan.items && contractPlan.items.length > 0) {
      const firstItem = contractPlan.items[0];
      this.pcaForm.get('items')?.patchValue({
        item_number: firstItem.item_number || 1,
        item_category_id: firstItem.item_category_id,
        catalog: firstItem.catalog,
        catalog_classification: firstItem.catalog_classification,
        superior_classification_code: firstItem.superior_classification_code,
        superior_classification_name: firstItem.superior_classification_name,
        pdm_code: firstItem.pdm_code || '',
        pdm_description: firstItem.pdm_description || '',
        item_code: firstItem.item_code,
        description: firstItem.description,
        supply_unit: firstItem.supply_unit,
        quantity: firstItem.quantity,
        unit_value: firstItem.unit_value,
        total_value: firstItem.total_value,
        budget_value_for_year: firstItem.budget_value_for_year,
        desired_date: firstItem.desired_date,
        requesting_unit: firstItem.requesting_unit || '',
        contracting_group_code: firstItem.contracting_group_code || '',
        contracting_group_name: firstItem.contracting_group_name || '',
        contract_renewal: firstItem.contract_renewal || false,
      });
    }

    // Trigger unit options population
    if (contractPlan.agency_country_register) {
      this.pcaForm
        .get('agency_country_register')
        ?.setValue(contractPlan.agency_country_register);
    }
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
      if (this.isEditMode && this.contractPlanId) {
        // Extract the items from contractPlanData
        const itemData: ContractPlanItemModel = contractPlanData.items[0];

        this._contractPlanService
          .updateContractPlanItem(
            this.contractPlanId,
            // You need to provide an itemId
            // This might come from the previously loaded contract plan
            this.loadedItemId || '',
            itemData
          )
          .subscribe({
            next: () => {
              this._toastr.success(
                'Plano de contrato atualizado com sucesso!',
                'Sucesso'
              );
              this._contractPlanService.goBack();
            },
            error: (error) => {
              console.error('Erro ao atualizar plano de contrato:', error);
              this._toastr.error('Erro ao atualizar plano de contrato', 'Erro');
            },
          });
      } else {
        // Create new contract plan
        this._contractPlanService
          .createContractPlan(contractPlanData)
          .subscribe({
            next: () => {
              this._toastr.success(
                'Plano de contrato criado com sucesso!',
                'Sucesso'
              );
              this._contractPlanService.goBack();
            },
            error: (error) => {
              console.error('Erro:', error);
              this._toastr.error('Erro ao criar plano de contrato', 'Erro');
            },
          });
      }
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
