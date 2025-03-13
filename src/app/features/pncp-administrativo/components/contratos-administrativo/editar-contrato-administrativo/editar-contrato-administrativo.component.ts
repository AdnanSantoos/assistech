import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { SidebarAdministrativoComponent } from '../../../../../shared/components/sidebar-administrativo/sidebar-administrativo.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LicitacaoModel } from '../../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/model/licitacoes-administrativo.model';
import { ToastrService } from 'ngx-toastr';
import { LicitacoesService } from '../../../../dashboard-administrativo/compontents/lista-licitacao-administrativo/service/licitacoes-administrativos.service';
import { ContratosService } from '../service/contratos-administrativos.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyMaskDirective } from '../../../../../shared/directives/currencyMask.directive';
import { FormErrorService } from '../../../../../shared/services/form-error.service';

@Component({
  selector: 'app-editar-contrato-administrativo',
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
    CurrencyMaskDirective,
  ],
  providers: [BsModalService, provideNgxMask()],
  templateUrl: './editar-contrato-administrativo.component.html',
  styleUrls: ['./editar-contrato-administrativo.component.scss'],
})
export class EditarContratoAdministrativoComponent {
  filtroForm: FormGroup;
  contratoForm: FormGroup;
  modalRef?: BsModalRef;
  selectedItem: any = null;
  licitacoes!: LicitacaoModel[];
  contratoId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private _toastrService: ToastrService,
    private modalService: BsModalService,
    private _licitacaoService: LicitacoesService,
    private _contratoService: ContratosService,
    private route: ActivatedRoute,
    private _errorService:FormErrorService
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
      change_reason: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        console.log('ID capturado da rota:', id);
        this.contratoId = id;
        this.loadContratoDetails(id);
      } else {
        console.error('ID não encontrado na rota.');
        this._toastrService.error('Erro ao carregar o ID do contrato.');
      }
    });
  }
  loadContratoDetails(id: string): void {
    this._contratoService.getContratoById(id).subscribe({
      next: (response) => {
        console.log('Detalhes do contrato retornados pela API:', response);

        if (response) {
          // Atualiza os campos principais
          this.contratoForm.patchValue({
            number: response.number,
            year: response.year,
            process: response.process,
            process_category_id: response.process_category_id,
            contract_type_id: response.contract_type_id,
            number_of_installments: response.number_of_installments,
            revenue: response.revenue,
            supplier_id: response.supplier_id,
            supplier_name: response.supplier_name,
            supplier_person_type: response.supplier_person_type,
            initial_value: response.initial_value,
            installment_value: response.installment_value,
            global_value: response.global_value,
            accumulated_value: response.accumulated_value,
            subcontracted_supplier_id: response.subcontracted_supplier_id,
            subcontracted_supplier_name: response.subcontracted_supplier_name,
            subcontracted_supplier_person_type:
              response.subcontracted_supplier_person_type,
            additional_information: response.additional_information,
            signature_date: response.signature_date
              ? response.signature_date.split(' ')[0]
              : null,
            start_date: response.start_date
              ? response.start_date.split(' ')[0]
              : null,
            end_date: response.end_date
              ? response.end_date.split(' ')[0]
              : null,
            goals: response.goals,
            change_reason: null,
            cipi_identifier: response.cipi_identifier,
            cipi_url: response.cipi_url,
          });

          // Atualiza campos específicos relacionados ao procurement
          if (response.procurement) {
            this.contratoForm.patchValue({
              procurement_id: response.procurement.id,
            });
          }
        } else {
          console.warn('Nenhum detalhe encontrado para o contrato.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar os detalhes do contrato:', err);
        this._toastrService.error('Erro ao carregar os detalhes do contrato.');
      },
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
    if (this.contratoForm.valid && this.contratoId) {
      const contratoData = this.contratoForm.value;

      this._contratoService
        .updateContrato(this.contratoId, contratoData)
        .subscribe({
          next: () => {
            console.log('Contrato atualizado com sucesso!');
            this.goBack();
          },
          error: (err) => {
            if (err.error?.errors) {
              this._errorService.handleApiErrors(this.contratoForm, err);
            }
          },
        });
    } else if (!this.contratoId) {
      this._toastrService.error('ID do contrato não encontrado.');
    } else {
      this._toastrService.warning('Preencha todos os campos obrigatórios.');
    }
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
