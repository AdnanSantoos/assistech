import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioData } from '../../model/usuarios.model';
@Component({
  selector: 'app-cadastrar-usuarios-administrativo',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './cadastrar-usuarios-administrativo.component.html',
  styleUrls: ['./cadastrar-usuarios-administrativo.component.scss']
})
export class CadastrarUsuariosAdministrativoComponent implements OnInit {

  usuarioForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      cliente: ['', Validators.required],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required], 
      cpf: ['', Validators.required],
      telefone: ['', Validators.required], 
      senha: ['', Validators.required], 
      status: [false], 
      tipo: ['EMPRESA', Validators.required]
    });

  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuarioData: UsuarioData = this.usuarioForm.value;
      console.log('Form Data:', usuarioData);
    }
  }
}
