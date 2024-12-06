import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './services/login.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink,MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private _route: ActivatedRoute,private _service: LoginService, private _fb: FormBuilder,private _toastr : ToastrService) {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      manterConectado: [false],
    });
    this._route.queryParams.subscribe(params => {
      if(params['sessionExpired']){
        this._toastr.info('Sua sessão expirou. Por favor, faça login novamente.')
      }
    });
  }

  getLoading(){
    return this._service.loading;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._service.login(this.loginForm.value);
    } 
  }
}
