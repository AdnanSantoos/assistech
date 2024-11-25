import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioData } from '../../model/usuarios.model';
import { UsuariosService } from '../usuarios-administrativo/service/usuarios-administrativos.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { CadastrarUsuariosMapper } from './mapper/cadastrar-usuarios-administrativos.mapper';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastrar-usuarios-administrativo',
  templateUrl: './cadastrar-usuarios-administrativo.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, TypeaheadModule],
  styleUrls: ['./cadastrar-usuarios-administrativo.component.scss']
})
export class CadastrarUsuariosAdministrativoComponent implements OnInit {
  searchResults: string[] = [];

  usuarioForm!: FormGroup;
  tenantSlugSelecionado!: string;
  constructor(private fb: FormBuilder, private _usuariosService: UsuariosService, private _toastrService: ToastrService) { }

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
  }

  autoCompleteResultados(termo: string): Observable<string[]> {
    return this._usuariosService.getClientes(termo);
  }

  onSelect(event: any): void {
    this.tenantSlugSelecionado = event.item.slug;
    console.log('tenantslug> ', this.tenantSlugSelecionado)

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