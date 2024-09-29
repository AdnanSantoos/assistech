/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarUsuariosAdministrativoComponent } from './cadastrar-usuarios-administrativo.component';

describe('CadastrarUsuariosAdministrativoComponent', () => {
  let component: CadastrarUsuariosAdministrativoComponent;
  let fixture: ComponentFixture<CadastrarUsuariosAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarUsuariosAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarUsuariosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
