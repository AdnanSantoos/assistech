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
import { ContractPlanModel } from './model/pca.model';
import { ContractPlanService } from './service/pca.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  pageSize = 10;
  currentPage = 1;
  totalPages = 1;
  isLoading = false;
  modalRef?: BsModalRef;
  selectedContrato: ContractPlanModel | null = null;
  deleteForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private contractPlanService: ContractPlanService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      processo: [''],
      ano: [''],
      modalidade: [''],
      orgao: [''],
    });
    this.deleteForm = this.fb.group({
      justification: ['', [Validators.required]], // Validação de campo obrigatório
    });
  }

  ngOnInit() {
    this.loadContractPlans();

    this.filterForm.valueChanges.subscribe(() => {
      this.currentPage = 1;
      this.loadContractPlans();
    });
  }
  visualizarPCA(element: ContractPlanModel): void {
    if (element?.unit?.agency?.country_register) {
      const baseUrl = 'https://treina.pncp.gov.br/app/pca/';
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
    this.deleteForm.reset(); // Limpa o formulário ao abrir o modal
  }

  loadContractPlans() {
    this.isLoading = true;

    this.contractPlanService
      .getContractPlans()
      .pipe(
        catchError((error) => {
          this.toastr.error('Erro ao carregar planos de contrato', 'Erro');
          throw error;
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe((response: RequisicaoModel<ContractPlanModel[]>) => {
        if (response.data) {
          this.dataSource.data = response.data;
        }
      });
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
      .deleteContractPlan(contractPlanId, justification) // Passando a justificativa
      .subscribe({
        next: () => {
          this.toastr.success('Plano de contrato anual removido com sucesso');
          this.loadContractPlans();
        },
        error: () => {
          this.toastr.error('Erro ao excluir plano de contrato', 'Erro');
        },
      });
  }
  applyFilter() {
    const filterValue = this.filterForm.value;
    // Implement filter logic here using the form values
    this.loadContractPlans();
  }
}
