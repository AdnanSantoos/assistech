import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteData } from '../../model/cliente.model';

@Component({
  selector: 'app-cadastrar-cliente-administrativo',
  templateUrl: './cadastrar-cliente-administrativo.component.html',
  imports: [CommonModule,ReactiveFormsModule],
  standalone: true,
  styleUrls: ['./cadastrar-cliente-administrativo.component.scss']
})
export class CadastrarClienteAdministrativoComponent implements OnInit {
  
  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      console.log('Form Data:', clienteData);
      // Aqui vai a lógica para enviar os dados para o backend
    }
  }
}
