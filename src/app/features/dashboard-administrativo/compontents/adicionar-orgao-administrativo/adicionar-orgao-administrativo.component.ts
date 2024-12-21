import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { LayoutFormsAdmComponent } from '../../../../shared/containers/layout-forms-adm/layout-forms-adm.component';
import { OrgaosService } from '../../../dashboard-administrativo/compontents/orgao-administrativo/service/orgao-administrativos.service';
import { OrgaoModel } from '../orgao-administrativo/model/orgao-administrativo.model';

@Component({
  selector: 'app-adicionar-orgao-administrativo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    LayoutFormsAdmComponent,
  ],
  templateUrl: './adicionar-orgao-administrativo.component.html',
  styleUrls: ['./adicionar-orgao-administrativo.component.scss'],
})
export class AdicionarOrgaoAdministrativoComponent implements OnInit {
  formulario!: FormGroup;
  resultado: OrgaoModel | null = null; // Corrigido para representar um único órgão ou nulo
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private orgaosService: OrgaosService,
    private _location: Location
  ) { }

  goBack(): void {
    this._location.back();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      country_register: [
        '',
        [Validators.required],
      ],
    });
  }

  buscarOrgao(): void {
    if (this.formulario.valid) {
      const countryRegister = this.formulario.get('country_register')?.value;

      this.orgaosService.getOrgaoPorRegistro(countryRegister).subscribe(
        (resposta) => {
          if (resposta?.data) {
            this.resultado = resposta.data; // Armazena os dados do órgão
            this.errorMessage = null;
          } else {
            this.resultado = null;
            this.errorMessage = 'Órgão não encontrado.';
          }
        },
        (erro) => {
          console.error('Erro ao buscar órgão:', erro);
          this.errorMessage = 'Erro ao buscar órgão. Tente novamente mais tarde.';
        }
      );
    } else {
      this.errorMessage = 'Preencha o registro nacional corretamente.';
    }
  }



  cadastrarOrgao(): void {
    if (this.resultado) {
      const orgaoData = { country_register: this.resultado.country_register };

      this.orgaosService.createOrgao(orgaoData).subscribe(
        () => {
          // Notificação de sucesso já é tratada no serviço.
          console.log('Órgão cadastrado com sucesso.');
        },
        (erro) => {
          // Erro já é tratado no serviço, mas pode ser logado aqui se necessário.
          console.error('Erro ao cadastrar órgão:', erro);
        }
      );
    }
  }



}
