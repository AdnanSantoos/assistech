import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _service :LoginService ,private _fb: FormBuilder) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      manterConectado: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._service.login(this.loginForm.value)
    }
  }
}
