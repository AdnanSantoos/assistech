import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ContractPlanFilters, ContractPlanModel } from './model/pca.model';
import { ContractPlanService } from './service/pca.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormErrorService } from '../../../../shared/services/form-error.service';

interface AgencyOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-pca-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [BsModalService],
  templateUrl: './pca-administrativo.component.html',
  styleUrl: './pca-administrativo.component.scss',
})
export class PcaAdministrativoComponent implements OnInit {
  displayedColumns: string[] = [
    'numSeq',
    'orgao',
    'unidade',
    'ano',
    'criadoEm',
    'acoes',
  ];

  dataSource = new MatTableDataSource<ContractPlanModel>([]);
  filterForm: FormGroup;
  pageSize = 15;
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  modalRef?: BsModalRef;
  selectedContrato: ContractPlanModel | null = null;
  deleteForm!: FormGroup;
  agencyOptions: AgencyOption[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private contractPlanService: ContractPlanService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _errorService: FormErrorService
  ) {
    this.filterForm = this.formBuilder.group({
      year: [''],
      agency_country_register: [''],
    });

    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadContractPlans();
    this.loadAgencyOptions();
  }

  loadAgencyOptions(): void {
    // Primeiro carregamento para preencher as agências
    this.loadContractPlans(true);
  }

  processAgencyOptions(data: ContractPlanModel[]): void {
    // Criar um Set para evitar duplicatas
    const uniqueAgencies = new Set<string>();
    const agencies: AgencyOption[] = [];

    data.forEach((item) => {
      if (
        item.unit?.agency &&
        !uniqueAgencies.has(item.unit.agency.country_register)
      ) {
        uniqueAgencies.add(item.unit.agency.country_register);
        agencies.push({
          value: item.unit.agency.country_register,
          label: item.unit.agency.name,
        });
      }
    });

    // Ordena as agências por nome
    this.agencyOptions = agencies.sort((a, b) =>
      a.label.localeCompare(b.label)
    );
  }

  visualizarPCA(element: ContractPlanModel): void {
    if (element?.unit?.agency?.country_register) {
      const baseUrl = 'https://pncp.gov.br/app/pca/';
      const countryRegister = element.unit.agency.country_register;
      const { year } = element;

      const fullUrl = `${baseUrl}${countryRegister}/${year}`;
      window.open(fullUrl, '_blank');
    } else {
      console.error(
        'Invalid contract plan data or missing agency information.'
      );
    }
  }

  openDeleteModal(
    contrato: ContractPlanModel,
    template: TemplateRef<any>
  ): void {
    this.selectedContrato = contrato;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.deleteForm.reset();
  }

  loadContractPlans(loadingAgencies: boolean = false) {
    this.isLoading = true;
    const filters = this.prepareFilters();

    this.contractPlanService
      .getContractPlans(filters)
      .pipe(
        catchError((error) => {
          throw error;
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((response: RequisicaoModel<ContractPlanModel[]>) => {
        if (response.data) {
          this.dataSource.data = response.data;

          if (loadingAgencies) {
            this.processAgencyOptions(response.data);
          }

          if (response.meta?.pagination) {
            this.currentPage = response.meta.pagination.current_page;
            this.totalPages = response.meta.pagination.last_page;
            this.pageSize = response.meta.pagination.per_page;
          }
        }
      });
  }

  private prepareFilters(): ContractPlanFilters {
    const filters: ContractPlanFilters = {
      page: this.currentPage,
      per_page: this.pageSize,
    };

    const formValues = this.filterForm.value;

    if (formValues.year) {
      filters.year = Number(formValues.year);
    }

    if (formValues.agency_country_register) {
      filters.agency_country_register = formValues.agency_country_register;
    }

    return filters;
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.loadContractPlans();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadContractPlans();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadContractPlans();
    }
  }

  editContractPlan(contractPlanId: string) {
    this.router.navigate(['editar-pca', contractPlanId], {
      relativeTo: this.route.parent,
    });
  }

  deleteContractPlan(contractPlanId: string) {
    const justification = this.deleteForm.get('justification')?.value;

    if (!justification) {
      this.toastr.error('Justificativa é obrigatória', 'Erro');
      return;
    }

    this.contractPlanService
      .deleteContractPlan(contractPlanId, justification)
      .subscribe({
        next: () => {
          this.modalRef?.hide();
          this.loadContractPlans();
        },
        error: (error) => {
          if (error.error?.errors) {
            this._errorService.handleApiErrors(this.deleteForm, error);
          }
          this.isLoading = false;
        },
      });
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadContractPlans();
  }
}
