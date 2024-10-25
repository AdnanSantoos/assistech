/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarLegislacaoAdministrativoComponent } from './cadastrar-legislacao-administrativo.component';

describe('CadastrarLegislacaoAdministrativoComponent', () => {
  let component: CadastrarLegislacaoAdministrativoComponent;
  let fixture: ComponentFixture<CadastrarLegislacaoAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarLegislacaoAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarLegislacaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
