import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _service: LoginService, private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      manterConectado: [false],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._service.login(this.loginForm.value);
    } else {
      console.log(
        'O formulário é inválido, por favor, preencha todos os campos corretamente.'
      );
    }
  }
}
