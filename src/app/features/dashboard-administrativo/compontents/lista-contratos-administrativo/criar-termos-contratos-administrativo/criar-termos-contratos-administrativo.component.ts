import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TermosContratosModel } from '../../../../pncp-administrativo/components/contratos-administrativo/model/contratos-administrativo.model';
import { ContratosService } from '../../../../pncp-administrativo/components/contratos-administrativo/service/contratos-administrativos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criar-termos-contratos-administrativo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BsDatepickerModule],
  templateUrl: './criar-termos-contratos-administrativo.component.html',
  styleUrls: ['./criar-termos-contratos-administrativo.component.scss'],
})
export class CriarTermosContratosAdministrativoComponent implements OnInit {
  termoForm!: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  contractId!: string;
  termoId!: string | null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private _contratoService: ContratosService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.bsConfig = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
    };
  }

  ngOnInit(): void {
    this.initializeForm();
  
    // Capturar IDs da rota
    this.route.paramMap.subscribe((params) => {
      this.contractId = params.get('id') || '';
      this.termoId = params.get('termoId'); // Captura termoId para modo de edição
  
      console.log('Contract ID:', this.contractId);
      console.log('Termo ID:', this.termoId);
  
      if (this.termoId) {
        this.isEditMode = true;
        console.log('Modo de edição ativado.');
        this.loadTermo(this.termoId); // Carrega os dados do termo
    } else if (this.contractId) {
        this.termoForm.patchValue({ contract_id: this.contractId });
      }
    });
  }
  

  initializeForm(): void {
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
  }

  // Carregar os dados do termo para edição
  loadTermo(termoId: string): void {
    this._contratoService.getTermoById(termoId).subscribe({
      next: (termo) => {
        console.log('Dados do termo carregados:', termo); // Debug dos dados carregados
        this.termoForm.patchValue({
          ...termo,
          validity_start_date: new Date(termo.validity_start_date),
          validity_end_date: new Date(termo.validity_end_date),
          signature_date: new Date(termo.signature_date),
        });
      },
      error: (err) => {
        console.error('Erro ao carregar o termo:', err);
      },
    });
  }

  // Submeter o formulário para criar ou editar
  onSubmit(): void {
    if (this.termoForm.invalid) {
      console.error('Formulário inválido.');
      return;
    }

    const termoData = this.termoForm.value;

    if (this.isEditMode && this.termoId) {
      // Modo de edição
      this._contratoService.updateTermo(this.termoId, termoData).subscribe({
        next: () => {
          console.log('Termo atualizado com sucesso!');
          this.goBack();
        },
        error: (err) => {
          console.error('Erro ao atualizar termo:', err);
        },
      });
    } else {
      // Modo de criação
      this._contratoService.createTermo(termoData).subscribe({
        next: () => {
          console.log('Termo criado com sucesso!');
          this.goBack();
        },
        error: (err) => {
          console.error('Erro ao criar termo:', err);
        },
      });
    }
  }

  goBack(): void {
    this._location.back();
  }
}