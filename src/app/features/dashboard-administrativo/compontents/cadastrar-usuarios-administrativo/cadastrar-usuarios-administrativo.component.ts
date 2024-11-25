import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from '../usuarios-administrativo/service/usuarios-administrativos.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { CadastrarUsuariosMapper } from './mapper/cadastrar-usuarios-administrativos.mapper';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuarios-administrativo',
  templateUrl: './cadastrar-usuarios-administrativo.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, TypeaheadModule, CommonModule],
  styleUrls: ['./cadastrar-usuarios-administrativo.component.scss']
})
export class CadastrarUsuariosAdministrativoComponent implements OnInit {
  searchResults: string[] = [];
  userId: string | null = ' ';
  isEditavel: boolean = false;
  usuarioForm!: FormGroup;
  formularioOriginal!: UsuarioData[];
  tenantSlugSelecionado!: string;
  constructor(private fb: FormBuilder, private _usuariosService: UsuariosService, private _toastrService: ToastrService, private route: ActivatedRoute, private _location: Location,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      country_register: ['', Validators.required],
      phone: ['', Validators.required],
      is_active: [true],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', [Validators.required]],
      role: ['', Validators.required],
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
        name: ['']
      }),
      tenant_slug: ['']
    });

    this.usuarioForm.get('tenant_slug')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((termo) => this.autoCompleteResultados(termo))
    ).subscribe((results: any) => {
      this.searchResults = results.data;
    });

    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      if (this.userId) {
        this.isEditavel = true;
        this._usuariosService.getUsuariosPorID(this.userId).subscribe((v) => {
          this.formularioOriginal = v.data;
          this.populaFormulario(v);
        })
      }
    });

  }
  populaFormulario(value: any) {
    this.usuarioForm.patchValue({
      name: value.data.name,
      email: value.data.email,
      username: value.data.username,
      country_register: value.data.country_register,
      phone: value.data.phone,
      is_active: value.data.is_active,
      role: value.data.role,
      permissions: {
        diario_oficial: {
          add: value.data.permissions.diario_oficial.add
        },
        pncp: {
          add: value.data.permissions.pncp.add,
          edit_own: value.data.permissions.pncp.edit_own,
          edit_others: value.data.permissions.pncp.edit_others
        },
        transparencia: {
          add: value.data.permissions.transparencia.add,
          edit_own: value.data.permissions.transparencia.edit_own,
          edit_others: value.data.permissions.transparencia.edit_others
        }
      },
      tenant: {
        slug: value.data.tenant.slug,
        name: value.data.tenant.name
      },
      tenant_slug: value.data.tenant_slug
    });
    this.usuarioForm.get('password_confirmation')?.clearValidators();
    this.usuarioForm.get('password_confirmation')?.updateValueAndValidity();
    this.usuarioForm.get('password')?.clearValidators();
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }
  autoCompleteResultados(termo: string): Observable<string[]> {
    return this._usuariosService.getClientes(termo);
  }

  onSelect(event: any): void {
    this.tenantSlugSelecionado = event.item.slug;
  }
  goBack(): void {
    this._location.back();
  }
  onRoleChange() {
    const role = this.usuarioForm.get('role')?.value;

    if (role === 'admin') {
      this.usuarioForm.get('permissions.diario_oficial.add')?.setValue(true);
      this.usuarioForm.get('permissions.pncp.add')?.setValue(true);
      this.usuarioForm.get('permissions.pncp.edit_own')?.setValue(true);
      this.usuarioForm.get('permissions.pncp.edit_others')?.setValue(true);
      this.usuarioForm.get('permissions.transparencia.add')?.setValue(true);
      this.usuarioForm.get('permissions.transparencia.edit_own')?.setValue(true);
      this.usuarioForm.get('permissions.transparencia.edit_others')?.setValue(true);
    } else if (role === 'secretary') {
      this.usuarioForm.get('permissions.diario_oficial.add')?.setValue(false);
      this.usuarioForm.get('permissions.pncp.add')?.setValue(false);
      this.usuarioForm.get('permissions.pncp.edit_own')?.setValue(false);
      this.usuarioForm.get('permissions.pncp.edit_others')?.setValue(false);
      this.usuarioForm.get('permissions.transparencia.add')?.setValue(false);
      this.usuarioForm.get('permissions.transparencia.edit_own')?.setValue(false);
      this.usuarioForm.get('permissions.transparencia.edit_others')?.setValue(false);
    }
  }
  onSubmit() {
    if (this.isEditavel) {
      if (this.usuarioForm.valid) {
        const usuarioData: UsuarioData = this.usuarioForm.value;
        this._usuariosService.editarUsuario(CadastrarUsuariosMapper.toEdit(usuarioData, this.formularioOriginal), this.userId!).subscribe(
          response => {
            this._toastrService.success('Usuário editado com sucesso');
            this.goBack();
          },
          error => {
            this._toastrService.error('Erro ao editar usuário:');
          }
        );
      }
    }
    else {
      if (this.usuarioForm.valid) {
        const usuarioData: UsuarioData = this.usuarioForm.value;
        this._usuariosService.createUser(CadastrarUsuariosMapper.toSubmit(usuarioData, this.tenantSlugSelecionado)).subscribe(
          response => {
            this._toastrService.success('Usuário criado com sucesso');
            this.usuarioForm.reset();
          },
          error => {
            this._toastrService.error('Erro ao criar usuário:');
          }
        );
      }
    }
  }
}