import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from '../usuarios-administrativo/service/usuarios-administrativos.service';

@Component({
  selector: 'app-cadastrar-usuarios-administrativo',
  templateUrl: './cadastrar-usuarios-administrativo.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrls: ['./cadastrar-usuarios-administrativo.component.scss']
})
export class CadastrarUsuariosAdministrativoComponent implements OnInit {

  usuarioForm!: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      country_register: ['', Validators.required],
      phone: ['', Validators.required],
      is_active: [true],
      password: ['', [Validators.required, Validators.minLength(8)]], // Adicionando validação de senha
      password_confirmation: ['', [Validators.required]], // Adicionando confirmação de senha
      permissions: this.fb.group({
        diario_oficial: this.fb.group({
          add: [false]
        }),
        pncp: this.fb.group({
          add: [false],
          edit_own: [false],
          edit_others: [false]
        }),
        transparencia: this.fb.group({
          add: [false],
          edit_own: [false],
          edit_others: [false]
        })
      }),
      tenant: this.fb.group({
        slug: [''],
        name: [''],
        tenant_slug: [''] 
      })
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const usuarioData: UsuarioData = this.usuarioForm.value;
      console.log('Dados do usuário antes de enviar:', usuarioData);
      this.usuariosService.createUser (usuarioData).subscribe(
        response => {
          console.log('Usuário criado com sucesso:', response);
        },
        error => {
          console.error('Erro ao criar usuário:', error);
        }
      );
    }
  }
}