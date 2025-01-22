import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ContractPlanModel } from './model/pca.model';
import { ContractPlanService } from './service/pca.service';
import { RequisicaoModel } from '../../../../shared/models/shared.model';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private contractPlanService: ContractPlanService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.filterForm = this.formBuilder.group({
      processo: [''],
      ano: [''],
      modalidade: [''],
      orgao: [''],
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
    if (confirm('Tem certeza que deseja excluir este plano de contrato?')) {
      this.contractPlanService
        .deleteContractPlan(contractPlanId, 'Exclusão solicitada pelo usuário')
        .subscribe({
          next: () => {
            this.loadContractPlans();
          },
          error: () => {
            this.toastr.error('Erro ao excluir plano de contrato', 'Erro');
          },
        });
    }
  }

  applyFilter() {
    const filterValue = this.filterForm.value;
    // Implement filter logic here using the form values
    this.loadContractPlans();
  }
}
