/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarListaPreposicoesAdministrativoComponent } from './cadastrar-lista-preposicoes-administrativo.component';

describe('CadastrarListaPreposicoesAdministrativoComponent', () => {
  let component: CadastrarListaPreposicoesAdministrativoComponent;
  let fixture: ComponentFixture<CadastrarListaPreposicoesAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarListaPreposicoesAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarListaPreposicoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
