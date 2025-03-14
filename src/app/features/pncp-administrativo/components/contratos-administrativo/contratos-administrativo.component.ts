import { SidebarAdministrativoComponent } from './../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NavbarComponent } from './../../../../shared/components/navbar/navbar.component';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LicitacoesService } from '../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/service/licitacoes-administrativos.service';
import { LicitacaoModel } from '../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/model/licitacoes-administrativo.model';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ContratosService } from './service/contratos-administrativos.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyMaskDirective } from '../../../../shared/directives/currencyMask.directive';
import { FormErrorService } from '../../../../shared/services/form-error.service';

@Component({
  selector: 'app-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    FormsModule,
    SidebarAdministrativoComponent,
    NgxMaskDirective,
    CurrencyMaskDirective
  ],
  providers: [BsModalService, provideNgxMask()],
  templateUrl: './contratos-administrativo.component.html',
  styleUrls: ['./contratos-administrativo.component.scss'],
})
export class ContratosAdministrativoComponent {
  filtroForm: FormGroup;
  contratoForm: FormGroup;
  modalFiltersForm: FormGroup; // New form for modal filters
  modalRef?: BsModalRef;
  selectedItem: any = null;
  licitacoes: LicitacaoModel[] = [];
  isLoading: boolean = false;

  // Pagination properties for modal
  currentModalPage = 1;
  modalPageSize = 10;
  totalModalItems = 0;
  totalModalPages = 0;

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private _toastrService: ToastrService,
    private modalService: BsModalService,
    private _licitacaoService: LicitacoesService,
    private _contratoService: ContratosService,
    private _errorService: FormErrorService
  ) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null],
    });

    this.contratoForm = this.fb.group({
      number: [''],
      procurement_id: [''],
      year: [''],
      process: [''],
      process_category_id: [''],
      contract_type_id: [''],
      number_of_installments: [''],
      revenue: [false],
      supplier_id: [''],
      cipi_identifier: [''],
      supplier_name: [''],
      cipi_url: [''],
      supplier_person_type: [''],
      initial_value: [''],
      installment_value: [''],
      global_value: [''],
      accumulated_value: [''],
      subcontracted_supplier_id: [''],
      subcontracted_supplier_name: [''],
      subcontracted_supplier_person_type: [''],
      additional_information: [''],
      signature_date: [''],
      start_date: [''],
      end_date: [''],
      goals: [''],
    });

    // Initialize modal filters form
    this.modalFiltersForm = this.fb.group({
      number: [''],
      year: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file,
      });
    }
  }

  goBack(): void {
    this._location.back();
  }

  onSubmit(): void {
    this.isLoading = true;
    this._contratoService.createContrato(this.contratoForm.value).subscribe(
      (v) => {
        this.goBack();
        this.isLoading = false;
      },
      (err) => {
        if (err.error?.errors) {
          this._errorService.handleApiErrors(this.contratoForm, err);
        }
        this.isLoading = false;
      }
    );
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-licitacoes' })
    );

    // Reset modal pagination and filters
    this.currentModalPage = 1;
    this.modalFiltersForm.reset({
      number: '',
      year: ''
    });

    // Load initial data
    this.loadLicitacoes(this.currentModalPage);
  }

  onSelecionarItem(item: any): void {
    this.selectedItem = item;
    this.contratoForm.controls['procurement_id'].setValue(item.id);
    this.modalRef?.hide();
  }

  // New methods for modal pagination and filtering
  loadLicitacoes(page: number, filters: any = {}): void {
    const params = {
      ...filters,
      page: page.toString()
    };

    this._licitacaoService.getLicitacoesWithFilters(params).subscribe({
      next: (response) => {
        this.licitacoes = response.data;
        this.totalModalItems = response.meta?.pagination.total || 0;
        this.totalModalPages = Math.ceil(this.totalModalItems / this.modalPageSize);
      },
      error: (err) => {
        this._toastrService.error('Erro ao carregar licitações');
        console.error('Erro ao carregar licitações:', err);
      },
    });
  }

  applyModalFilters(): void {
    const filters = this.modalFiltersForm.value;

    // Remove empty fields
    const cleanedFilters = Object.keys(filters)
      .filter((key) => filters[key] !== null && filters[key] !== '')
      .reduce((acc, key) => {
        acc[key] = filters[key];
        return acc;
      }, {} as any);

    // Reset to first page when applying new filters
    this.currentModalPage = 1;

    // Load data with filters
    this.loadLicitacoes(this.currentModalPage, cleanedFilters);
  }

  clearModalFilters(): void {
    // Reset form to initial state
    this.modalFiltersForm.reset({
      number: '',
      year: ''
    });

    // Reload without filters
    this.currentModalPage = 1;
    this.loadLicitacoes(1);
  }

  goToModalPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalModalPages) {
      this.currentModalPage = pageNumber;
      this.loadLicitacoes(this.currentModalPage, this.getActiveFilters());
    }
  }

  goToPreviousModalPage(): void {
    if (this.currentModalPage > 1) {
      this.currentModalPage--;
      this.loadLicitacoes(this.currentModalPage, this.getActiveFilters());
    }
  }

  goToNextModalPage(): void {
    if (this.currentModalPage < this.totalModalPages) {
      this.currentModalPage++;
      this.loadLicitacoes(this.currentModalPage, this.getActiveFilters());
    }
  }

  // Helper method to get current active filters
  private getActiveFilters(): any {
    const filters = this.modalFiltersForm.value;
    return Object.keys(filters)
      .filter((key) => filters[key] !== null && filters[key] !== '')
      .reduce((acc, key) => {
        acc[key] = filters[key];
        return acc;
      }, {} as any);
  }
}
