import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteData } from '../../model/cliente.model';
import { ClienteAdministrativoService } from '../cliente-administrativo/services/cliente-administrativo.service';
import { CadastrarClienteMapper } from './mapper/cadastrar-cliente-administrativo.mapper';
import { response } from 'express';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-cliente-administrativo',
  templateUrl: './cadastrar-cliente-administrativo.component.html',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./cadastrar-cliente-administrativo.component.scss']
})
export class CadastrarClienteAdministrativoComponent implements OnInit {
  
  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder, private _clienteService: ClienteAdministrativoService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      cidade: ['', Validators.required],
      nome: ['', Validators.required],
      pncp: [false],
      portalTransparencia: [false],
      diarioOficial: [false],
      anoInicial: [''],
      proximaEdicao: [''],
      subdominio: [''],
      tipo: ['EMPRESA', Validators.required],
      dominio: [''],
      status: [false]
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteData: ClienteData = this.clienteForm.value;
      this._clienteService.createUser(CadastrarClienteMapper.toSubmit(clienteData)).subscribe(
        response=>{
          this._toastrService.success('Usuário criado com sucesso');
          this.clienteForm.reset();

        },
        error => {
          this._toastrService.error('Erro ao criar usuário:');

        }
      )
    }
  }
}
