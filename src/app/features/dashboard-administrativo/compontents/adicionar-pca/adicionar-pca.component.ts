import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
import { FormErrorService } from '../../../../shared/services/form-error.service';

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
  loadedItemIds: string[] = [];

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

  catalogoClassificacao: SelectOption[] = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
  ];

  bensCategoria: SelectOption[] = [
    { value: 1, key: 'Bens imóveis' },
    { value: 2, key: 'Bens móveis' },
    { value: 3, key: 'Não se aplica' },
  ];

  get itemsFormArray() {
    return this.pcaForm.get('items') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private _adicionarLicitacaoService: AdicionarLicitacaoService,
    private _contractPlanService: ContractPlanService,
    private _toastr: ToastrService,
    private _tenantService: TenantService,
    private _route: ActivatedRoute,
    private _errorService: FormErrorService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.setupTenantSubscription();
    this.loadOrgaos();

    this._route.paramMap.subscribe((params) => {
      this.contractPlanId = params.get('id');

      if (this.contractPlanId) {
        this.isEditMode = true;
        this.loadContractPlanDetails();
      }
    });
  }

  private createItemFormGroup(): FormGroup {
    return this.fb.group({
      id: [''],
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
      change_reason: [''],
    });
  }

  private initForm(): void {
    this.pcaForm = this.fb.group({
      tenant_slug: [this._tenantService.getTenant()],
      agency_country_register: [
        { value: '', disabled: false },
        Validators.required,
      ],
      unit_id: [{ value: '', disabled: false }, Validators.required],
      year: [{ value: '', disabled: false }, Validators.required],
      created_by_id: [''],
      items: this.fb.array([this.createItemFormGroup()]),
    });

    this.pcaForm
      .get('agency_country_register')
      ?.valueChanges.subscribe((selectedAgencyId: string) => {
        if (!selectedAgencyId) return;

        const selectedAgency = this.orgaos.find(
          (org) => org.country_register === selectedAgencyId
        );

        if (selectedAgency) {
          this.unitOptions = selectedAgency.units.map((unit) => ({
            key: unit.name,
            value: unit.id,
          }));

          if (!this.isEditMode || !this.pcaForm.get('unit_id')?.value) {
            this.pcaForm.get('unit_id')?.setValue('');
          }
        } else {
          this.unitOptions = [];
          this.pcaForm.get('unit_id')?.setValue('');
        }
      });
  }

  addItem(): void {
    if (this.itemsFormArray.length < 10) {
      const newItemGroup = this.createItemFormGroup();
      newItemGroup.patchValue({
        item_number: this.itemsFormArray.length + 1,
      });
      this.itemsFormArray.push(newItemGroup);
    } else {
      this._toastr.warning('Máximo de 10 itens permitido');
    }
  }

  removeItem(index: number): void {
    this.itemsFormArray.removeAt(index);

    // Reajusta os números dos itens após a remoção, caso ainda existam itens
    if (this.itemsFormArray.length > 0) {
      this.itemsFormArray.controls.forEach((control, idx) => {
        control.patchValue({ item_number: idx + 1 });
      });
    }
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
    this.pcaForm.patchValue({
      agency_country_register: contractPlan.agency_country_register,
      unit_id: contractPlan.unit_id,
      year: contractPlan.year,
      created_by_id: contractPlan.created_by_id,
    });

    // Limpa os itens existentes
    while (this.itemsFormArray.length) {
      this.itemsFormArray.removeAt(0);
    }

    if (contractPlan.items && contractPlan.items.length > 0) {
      contractPlan.items.forEach((item) => {
        const itemGroup = this.createItemFormGroup();
        itemGroup.patchValue({
          ...item,
          id: item.id || '',
        });
        this.itemsFormArray.push(itemGroup);
      });
    } else {
      this.itemsFormArray.push(this.createItemFormGroup());
    }

    if (this.isEditMode) {
      this.pcaForm.get('agency_country_register')?.disable();
      this.pcaForm.get('unit_id')?.disable();
      this.pcaForm.get('year')?.disable();
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
    const formValue = this.pcaForm.getRawValue();
    const currentSlug = this._tenantService.getTenant();

    if (!currentSlug) return;

    const contractPlanData: ContractPlanModel = {
      tenant_slug: currentSlug,
      agency_country_register: formValue.agency_country_register,
      unit_id: formValue.unit_id,
      year: Number(formValue.year),
      created_by_id: formValue.created_by_id,
      items: formValue.items,
    };

    if (this.isEditMode && this.contractPlanId) {
      const updatePromises = formValue.items.map(
        (item: ContractPlanItemModel) => {
          if (item.id) {
            // Atualiza item existente
            return this._contractPlanService
              .updateContractPlanItem(this.contractPlanId!, item.id, item)
              .toPromise();
          } else {
            // Cria novo item
            return this._contractPlanService
              .createContractPlanItem(this.contractPlanId!, item)
              .toPromise();
          }
        }
      );

      Promise.all(updatePromises)
        .then(() => {
        })
        .catch((error) => {
          if (error.error?.errors) {
            this._errorService.handleApiErrors(this.pcaForm, error);
          }
          this.isLoading = false;
        });
    } else {
      this._contractPlanService.createContractPlan(contractPlanData).subscribe({
        next: () => {

        },
        error: (error) => {
          if (error.error?.errors) {
            this._errorService.handleApiErrors(this.pcaForm, error);
          }
          this.isLoading = false;
        },
      });
    }
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.pcaForm.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  isItemFieldInvalid(itemIndex: number, controlName: string): boolean {
    const control = this.itemsFormArray.at(itemIndex).get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getFieldError(controlName: string): string {
    const control = this.pcaForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['min']) return 'Valor deve ser maior que zero';
    }
    return '';
  }

  getItemFieldError(itemIndex: number, controlName: string): string {
    const control = this.itemsFormArray.at(itemIndex).get(controlName);
    if (control?.errors) {
      if (control.errors['required']) return 'Campo obrigatório';
      if (control.errors['min']) return 'Valor deve ser maior que zero';
    }
    return '';
  }

  calculateTotalValue(itemIndex: number): void {
    const itemFormGroup = this.itemsFormArray.at(itemIndex);
    const quantity = itemFormGroup.get('quantity')?.value || 0;
    const unitValue = itemFormGroup.get('unit_value')?.value || 0;
    const totalValue = quantity * unitValue;

    itemFormGroup.patchValue({ total_value: totalValue }, { emitEvent: false });
  }
}
