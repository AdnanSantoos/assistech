import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-itens-licitacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-itens-licitacao.component.html',
  styleUrls: ['./editar-itens-licitacao.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditarItensLicitacaoComponent implements OnInit {
  editarItemForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editarItemForm = this.fb.group({
      beneficio: ['Não', Validators.required],
      categoriaItem: ['', Validators.required],
      tipoBeneficio: ['', Validators.required],
      descricaoItem: ['', [Validators.required, Validators.maxLength(2048)]],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      unidadeMedida: ['', Validators.required],
      valorUnitarioEstimado: ['', Validators.required],
      valorTotal: ['', Validators.required],
      patrimonio: [''],
      codigoRegistroImobiliario: [''],
      situacaoItem: ['', Validators.required],
      margemPreferenciaNormal: ['Não', Validators.required],
      margemPreferenciaAdicional: ['Não', Validators.required],
      percentualMargemNormal: [''],
      percentualMargemAdicional: [''],
      codigoNCM: [''],
      descricaoNCM: ['', [Validators.maxLength(2048)]],
      motivoEdicao: ['', Validators.maxLength(2048)]
    });
  }

  salvar(): void {
    if (this.editarItemForm.valid) {
      console.log('Form Data:', this.editarItemForm.value);
    } else {
      console.error('Formulário inválido');
    }
  }
}
