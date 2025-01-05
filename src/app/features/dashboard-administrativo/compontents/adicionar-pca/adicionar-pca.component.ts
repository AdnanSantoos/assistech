import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  OrgaoModel,
  SelectedAgencies,
} from '../orgao-administrativo/model/orgao-administrativo.model';
import { selectModel } from '../../../../shared/models/shared.model';
import { AdicionarLicitacaoService } from '../../../pncp-administrativo/components/dados-da-licitacao-administrativo/service/adicionar-licitacao.services';

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
  styleUrls: ['./adicionar-pca.component.scss'],
})
export class AdicionarPcaComponent {
  itemForm: FormGroup;
  agencyOptions: SelectedAgencies[] = [];
  unitOptions: selectModel[] = [];
  cnpjSelecionado!: string;
  orgaos: OrgaoModel[] = [];

  categoriaItem = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
    { value: 3, key: 'Obras' },
    { value: 4, key: 'Serviços de Engenharia' },
    { value: 5, key: 'Soluções de TIC' },
    { value: 6, key: 'Locação de Imóveis' },
    { value: 7, key: 'Alienação/Concessão/Permissão' },
    { value: 8, key: 'Obras e Serviços de Engenharia' },
  ];
  categoriaMaterialServico = [
    { value: 1, key: 'CNBS (Catálogo Nacional de Bens e Serviços)' },
    { value: 2, key: 'Outros' },
  ];
  MaterialOuServico = [
    { value: 1, key: 'Material' },
    { value: 2, key: 'Serviço' },
  ];
  constructor(
    private fb: FormBuilder,
    private _adicionarLicitacaoService: AdicionarLicitacaoService
  ) {
    // Criação do form group com todos os campos
    this.itemForm = this.fb.group({
      agency: ['', Validators.required],
      unit_id: ['', Validators.required],
      ano: ['', Validators.required],
      renovacaoContrato: [''],
      codigoClasseMaterial: [''],
      descricaoClasseMaterial: [''],
      codigoPDM: [''],
      codigoMaterialServico: [''],
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
      nomeContratacaoFutura: [''],
      valorOrcamentario: [''],
      quantidadeItens: [''],
      descricaoMaterialServico: [''],
      dataContratacao:['']
    });

    this.itemForm
      .get('agency')
      ?.valueChanges.subscribe((selectedAgencies: SelectedAgencies) => {
        this.cnpjSelecionado = selectedAgencies.value;
        selectedAgencies.unit.forEach((unit) => {
          this.unitOptions.push({
            key: unit.name,
            value: unit.id,
          });
        });
      });
    this.loadOrgaos();
  }

  loadOrgaos(): void {
    this._adicionarLicitacaoService.getOrgaos().subscribe({
      next: (response: any) => {
        this.orgaos = response.data;
        this.agencyOptions = this.orgaos.map((orgao: any) => ({
          value: orgao.country_register,
          label: orgao.name,
          unit: orgao.units,
        }));
        this.unitOptions = [];
      },
      error: (err) => {
        console.error('Erro ao carregar órgãos:', err);
      },
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
