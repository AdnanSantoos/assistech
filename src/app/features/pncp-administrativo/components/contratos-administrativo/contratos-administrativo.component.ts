import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contratos-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './contratos-administrativo.component.html',
  styleUrls: ['./contratos-administrativo.component.scss'],
})
export class ContratosAdministrativoComponent {
  filtroForm: FormGroup;
  dynamicFields: any[];

  constructor(private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      ataDaSessao: [''],
      day: [''],
      month: [''],
      year: [''],
      file: [null],
    });

    this.dynamicFields = [
      { name: 'selecioneLista', title: 'Selecione Contrato', type: 'file', fileType: 'complex', label: 'Selecione na Lista', nameButton: 'Selecione na Lista' },
      { name: 'receitaDespesa', type: 'toggle', label: 'Receita/Despesa' },
    
      { 
        name: 'tipoContrato', 
        type: 'select', 
        label: 'Tipo do Contrato', 
        options: [
          { value: 'tipo1', label: 'Tipo 1' },
          { value: 'tipo2', label: 'Tipo 2' },
          { value: 'tipo3', label: 'Tipo 3' }
        ] 
      },
      { 
        name: 'categoriaProcesso', 
        type: 'select', 
        label: 'Categoria do Processo', 
        options: [
          { value: 'categoria1', label: 'Categoria 1' },
          { value: 'categoria2', label: 'Categoria 2' },
          { value: 'categoria3', label: 'Categoria 3' }
        ] 
      },
    
      { name: 'numContrato', type: 'text', label: 'Número do contrato ou empenho' },
      { name: 'anoContrato', type: 'text', label: 'Ano do contrato' },
    
      { name: 'numProcesso', type: 'text', label: 'Número do processo' },
      { 
        name: 'tipoPessoa', 
        type: 'select', 
        label: 'Tipo da Pessoa', 
        options: [
          { value: 'tipo1', label: 'Tipo 1' },
          { value: 'tipo2', label: 'Tipo 2' },
          { value: 'tipo3', label: 'Tipo 3' }
        ] 
      },
    
      { name: 'numCNPJCPF', type: 'text', label: 'Número do CNPJ/CPF do fornecedor/prestador' },
      { name: 'nomerazao', type: 'text', label: 'Nome ou Razão Social' },
    
      { name: 'ValorInicialContrato', type: 'text', label: 'Valor Inicial do contrato' },
      { name: 'valParcela', type: 'text', label: 'Valor da parcela' },
    
      { name: 'valGlobContrato', type: 'text', label: 'Valor Global do Contrato' },
      { name: 'valAcumuladoContrato', type: 'text', label: 'Valor acumulado do contrato' },
    
      { 
        name: 'tipoFornecedor', 
        type: 'select', 
        label: 'Tipo de fornecedor subcontratado', 
        options: [
          { value: 'tipo1', label: 'Tipo 1' },
          { value: 'tipo2', label: 'Tipo 2' },
          { value: 'tipo3', label: 'Tipo 3' }
        ] 
      },
      { name: 'numCNPJFornecSubcontratado', type: 'text', label: 'Número do CNPJ/CPF do fornecedor/prestador subcontratado' },
    
      { name: 'nomeFornecedorSub', type: 'text', label: 'Nome do fornecedor subcontratado' },
      { name: 'identificadorContrato', type: 'text', label: 'Identificador do Contrato' },
    
      { name: 'urfInformacoesContrato', type: 'text', label: 'URF COM INFORMAÇÕES DO CONTRATO' },
      { name: 'dataAssinatura', type: 'date', label: 'Data de assinatura do contrato' },
    
      { name: 'dataAssinaturaContrato', type: 'date', label: 'Data de assinatura do contrato' },
      { name: 'dataFinalVigencia', type: 'date', label: 'Data final da vigência' }
    ];
    
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.filtroForm.patchValue({
        file: file,
      });
    }
  }

  onFormSubmit() {}
}
