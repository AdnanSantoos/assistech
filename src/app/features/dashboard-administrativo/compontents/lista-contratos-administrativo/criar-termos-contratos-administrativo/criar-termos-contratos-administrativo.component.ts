import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { TermosContratosModel } from '../../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { ActivatedRoute } from '@angular/router';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-criar-termos-contratos-administrativo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './criar-termos-contratos-administrativo.component.html',
  styleUrls: ['./criar-termos-contratos-administrativo.component.scss']
})
export class CriarTermosContratosAdministrativoComponent {
  termoForm!: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  contractId!: string;
  constructor(private fb: FormBuilder, private localeService: BsLocaleService, private _contratoService: ContratosService, private route: ActivatedRoute, private _location: Location) {
    this.localeService.use('pt-br');
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY'
    };
    this.termoForm = this.fb.group({
      contract_id: ['', Validators.required],
      contract_term_type_id: ['', Validators.required],
      number: ['', Validators.required],
      number_of_installments: [0, Validators.required],
      added_value: [0, Validators.required],
      installment_value: [0, Validators.required],
      total_value: [0, Validators.required],
      added_term_days: [0, Validators.required],
      validity_start_date: ['', Validators.required],
      validity_end_date: ['', Validators.required],
      signature_date: ['', Validators.required],
      goals: ['', [Validators.required, Validators.maxLength(5120)]],
      legal_basis: ['', [Validators.required, Validators.maxLength(5120)]],
      addition_suppression_qualification: [false],
      adjustment_qualification: [false],
      informative_qualification: [false],
      supplier_qualification: [false],
      validity_qualification: [false],
      change_reason: [''],
    });

    this.route.paramMap.subscribe((params) => {
      this.contractId = params.get('id') || '';
      if (this.contractId) {
        this.initializeForm(this.contractId);
      } else {
        console.error('ID do contrato não fornecido na rota.');
      }
    });

  }
  initializeForm(contractId: string): void {
    this.termoForm = this.fb.group({
      contract_id: [contractId, Validators.required], // Preenche o contract_id automaticamente
      contract_term_type_id: ['', Validators.required],
      number: ['', Validators.required],
      number_of_installments: [0, Validators.required],
      added_value: [0, Validators.required],
      installment_value: [0, Validators.required],
      total_value: [0, Validators.required],
      added_term_days: [0, Validators.required],
      validity_start_date: ['', Validators.required],
      validity_end_date: ['', Validators.required],
      signature_date: ['', Validators.required],
      goals: ['', [Validators.required, Validators.maxLength(5120)]],
      legal_basis: ['', [Validators.required, Validators.maxLength(5120)]],
      addition_suppression_qualification: [false],
      adjustment_qualification: [false],
      informative_qualification: [false],
      supplier_qualification: [false],
      validity_qualification: [false],
      change_reason: [''],
    });
  }
  goBack(): void {
    this._location.back();
  }

  onSubmit(): void {

    this._contratoService.createTermo(this.termoForm.value).subscribe({
      next: () => {
        this.goBack();

      },
      error: (err) => {
        console.error('Erro ao criar termo:', err);
      }
    });

  }

}