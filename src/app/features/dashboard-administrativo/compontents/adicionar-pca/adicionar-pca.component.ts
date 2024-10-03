import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-adicionar-pca',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './adicionar-pca.component.html',
  styleUrls: ['./adicionar-pca.component.scss']
})
export class AdicionarPcaComponent {
  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Criação do form group com todos os campos
    this.itemForm = this.fb.group({
      orgao: ['', Validators.required],
      unidadeCompradora: ['', Validators.required],
      ano: ['', Validators.required],
      renovacaoContrato: [''],
      numeroItem: ['', Validators.required],
      categoriaItem: ['', Validators.required],
      categoriaMaterialServico: ['', Validators.required],
      categoriaMaterialServico2: ['', Validators.required],
      codigoClasseGrupoServico: ['', Validators.required],
      descricaoClasseGrupoServico: ['', Validators.required],
      codigoPDMMaterialCNIS: [''],
      descricaoPDM: [''],
      codigoMaterialCatalogoUtilizado: ['', Validators.required],
      descricaoMaterialCatalogo: ['', Validators.required],
      identificadorUnidadeFornecimento: [''],
      quantidadeItensPlano: ['', Validators.required],
      valorUnitarioItem: ['', Validators.required],
      valorTotalItem: ['', Validators.required],
      valorOrcamentarioEstimado: ['', Validators.required],
      dataDesejadaContratacao: ['', Validators.required],
      nomeUnidadeRequisitante: [''],
      codigoContratacaoFutura: [''],
      nomeContratacaoFutura: ['']
    });
  }

  // Tratamento de evento de upload de arquivo
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.itemForm.patchValue({
        file: file,
      });
    }
  }

  // Método de envio do formulário
  onFormSubmit() {
    if (this.itemForm.valid) {
      console.log(this.itemForm.value);
      // Aqui você pode processar os dados do formulário
    } else {
      console.log('Formulário inválido');
    }
  }
}
