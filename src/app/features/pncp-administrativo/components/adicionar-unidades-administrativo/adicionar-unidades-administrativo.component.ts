import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrgaosService } from '../../../dashboard-administrativo/compontents/orgao-administrativo/service/orgao-administrativos.service';
import { UnidadesService } from '../../../dashboard-administrativo/compontents/unidades-administrativo/service/unidades-administrativos.service';

@Component({
  selector: 'app-adicionar-unidades-administrativo',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './adicionar-unidades-administrativo.component.html',
  styleUrls: ['./adicionar-unidades-administrativo.component.scss'],
})
export class AdicionarUnidadesAdministrativoComponent implements OnInit {
  formulario!: FormGroup;
  orgaos: Array<{ name: string; country_register: string }> = [];
  cidades: Array<{ code: number; label: string }> = []; // Ajustado para usar `code` da API
  cidadeSelecionada: { code: number; label: string } | null = null;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private orgaosService: OrgaosService,
    private _location: Location,
    private _unidadesService: UnidadesService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarOrgaos();
  }
  selecionarOrgao(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
    }
    if (target && target.value) {
      const countryRegister = target.value;
      this.formulario.get('agency_country_register')?.setValue(countryRegister);
    } else {
      console.error('Nenhum órgão selecionado!');
    }
  }

  inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      agency_country_register: [null, Validators.required], // Órgão
      code: ['', Validators.required], // Código da Unidade
      name: ['', Validators.required], // Nome da Unidade
      city_code: [null, Validators.required], // Cidade (será preenchido com o `code` da cidade selecionada)
    });

    console.log('Formulário inicializado:', this.formulario.value);
  }

  carregarOrgaos(): void {
    this.isLoading = true;
    this.orgaosService.getOrgaos(1).subscribe(
      (response) => {
        this.orgaos = response.data;
        this.isLoading = false;
        console.log('Órgãos carregados:', this.orgaos);
      },
      (error) => {
        console.error('Erro ao carregar órgãos:', error);
        this.isLoading = false;
      }
    );
  }

  onInputCidade(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value?.trim();
    if (value && value.length >= 1) {
      this.buscarCidades(value);
    } else {
      this.cidades = [];
    }
  }

  buscarCidades(label: string): void {
    console.log('Buscando cidades para:', label);
    this.isLoading = true;
    this._unidadesService.getCidades(label).subscribe(
      (response) => {
        this.cidades = response.data.map((cidade) => ({
          code: Number(cidade.code), // Converte o `code` para número
          label: cidade.label,
        }));
        this.isLoading = false;
        console.log('Cidades encontradas:', this.cidades);
      },
      (error) => {
        console.error('Erro ao buscar cidades:', error);
        this.isLoading = false;
      }
    );
  }

  selecionarCidade(cidade: { code: number; label: string }): void {
    // Armazena a cidade selecionada e atualiza o formulário
    this.cidadeSelecionada = cidade;
    this.formulario.get('city_code')?.setValue(cidade.code); // Define o código da cidade no formulário

    // Exibe mensagem de confirmação no console
    console.log('Cidade selecionada:', cidade);

    // Limpa sugestões de autocomplete após seleção
    this.cidades = [];
  }

  cadastrarUnidade(): void {
    // Verifica se o formulário está válido
    if (this.formulario.valid && this.cidadeSelecionada) {
      const unidadeData = this.formulario.value; // Obtém os dados do formulário
      console.log('Dados para cadastro:', unidadeData);

      // Envia os dados para o serviço
      this._unidadesService.createUnidade(unidadeData).subscribe(
        () => {
          console.log('Unidade cadastrada com sucesso!');
        },
        (error) => {
          console.error('Erro ao cadastrar unidade:', error);
        }
      );
    } else {
      // Exibe erro se o formulário estiver inválido ou sem cidade selecionada
      console.error(
        'Formulário inválido ou cidade não selecionada!',
        this.formulario.value
      );
    }
  }

  goBack(): void {
    this._location.back();
  }
}
