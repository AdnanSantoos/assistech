import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../shared/containers/layout-forms-adm/layout-forms-adm.component';

@Component({
  selector: 'app-dados-da-licitacao-administrativo',
  standalone: true,
  imports: [
    LayoutFormsAdmComponent,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './dados-da-licitacao-administrativo.component.html',
  styleUrl: './dados-da-licitacao-administrativo.component.scss',
})
export class DadosDaLicitacaoAdministrativoComponent {
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
      { name: 'orgaoDaLicitacao', type: 'file', fileType: 'simple', label: 'Órgão da licitação' },
      { name: 'tituloDoDocumento', type: 'text', label: 'Dítulo do Documento' },
      { name: 'file', type: 'file', fileType: 'complex', label: 'Documento da Licitação' },
      { name: 'tipoDeDocumento', type: 'text', label: 'Tipo de Documento' },
      { name: 'tipoDeInstrumentoConvocatorio', type: 'text', label: 'Tipo de Instrumento Convocatório' },
      { name: 'NumeroDaCompra', type: 'text', label: 'Número da Compra' },
      { name: 'AnoDaCompra', type: 'text', label: 'Ano da Compra' },
      { name: 'NumeroDaProcesso', type: 'text', label: 'Número da Processo' },
      { name: 'AmparoLegal', type: 'text', label: 'Âmparo Legal' },
      { name: 'dataDaAberturaDaProposta', type: 'text', label: 'Data da Abertura da Proposta' },
      { name: 'dataDoEncerramentoDaProposta', type: 'text', label: 'Data do Encerramento da proposta' },
      { name: 'objetoDaCompra', type: 'textarea', label: 'Objeto da Compra' },
      { name: 'informacaoComplementar', type: 'textarea', label: 'Informação Complementar' },
      { name: 'compraDoSistemaDePreco', type: 'checkbox', label: 'Compra do sistema de registro de preços?' },
      { name: 'title', type: 'title', label: 'Dados da Licitação' },
      { name: 'incentivoFiscalPPB', type: 'checkbox', label: 'Incentivo fiscal ppb?' },
      { name: 'orcamentoSigiloso', type: 'checkbox', label: 'Orçamento Sigiloso?' },
      { name: 'categoriaDoItem', type: 'text', label: 'Categoria do Item' },
      { name: 'materialOuServico', type: 'text', label: 'Material ou serviço?' },
      { name: 'descricaoDoItem', type: 'textarea', label: 'Descrição do item' },
      { name: 'quantidade', type: 'text', label: 'Quantidade' },
      { name: 'unidadeDeMedida', type: 'text', label: 'Unidade de medida' },
      { name: 'valorUnitarioEstimado', type: 'text', label: 'Valor unitário estimado' },
      { name: 'valorTotal', type: 'text', label: 'Valor Total' },
      { name: 'codigoDeRegistroImobiliario', type: 'text', label: 'Código de Registro Imobiliário' },
    ];
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filtroForm.patchValue({
        [fieldName]: file,
      });
    }
  }

  onFormSubmit() {
    console.log(this.filtroForm.value);
  }
}
