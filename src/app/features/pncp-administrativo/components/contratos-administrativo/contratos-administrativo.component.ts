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
  modalRef?: BsModalRef;
  selectedItem: any = null;
  licitacoes!: LicitacaoModel[];

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private _toastrService: ToastrService,
    private modalService: BsModalService,
    private _licitacaoService: LicitacoesService,
    private _contratoService: ContratosService
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
    console.log(this.contratoForm.value);
    this._contratoService.createContrato(this.contratoForm.value).subscribe(
      (v) => {
        console.log(v);
      },
      (err) => {
        console.log(err);
        this._toastrService.error(err.error.message);
      }
    );
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg modal-licitacoes' })
    );
    this._licitacaoService.getLicitacoes(1).subscribe({
      next: (response) => {
        this.licitacoes = response.data;
      },
      error: (err) => {
        this._toastrService.error(err);
      },
    });
  }

  onSelecionarItem(item: any): void {
    this.selectedItem = item;
    this.contratoForm.controls['procurement_id'].setValue(item.id);
    console.log('Item selecionado:', this.selectedItem);
    this.modalRef?.hide();
  }
}
