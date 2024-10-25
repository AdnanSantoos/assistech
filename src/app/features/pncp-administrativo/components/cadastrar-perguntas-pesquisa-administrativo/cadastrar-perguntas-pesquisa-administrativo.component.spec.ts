/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarPerguntasPesquisaAdministrativoComponent } from './cadastrar-perguntas-pesquisa-administrativo.component';

describe('CadastrarPerguntasPesquisaAdministrativoComponent', () => {
  let component: CadastrarPerguntasPesquisaAdministrativoComponent;
  let fixture: ComponentFixture<CadastrarPerguntasPesquisaAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarPerguntasPesquisaAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPerguntasPesquisaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
