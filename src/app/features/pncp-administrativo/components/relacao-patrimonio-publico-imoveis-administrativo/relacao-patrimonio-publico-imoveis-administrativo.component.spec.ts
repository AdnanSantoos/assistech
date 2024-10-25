/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelacaoPatrimonioPublicoImoveisAdministrativoComponent } from './relacao-patrimonio-publico-imoveis-administrativo.component';

describe('RelacaoPatrimonioPublicoImoveisAdministrativoComponent', () => {
  let component: RelacaoPatrimonioPublicoImoveisAdministrativoComponent;
  let fixture: ComponentFixture<RelacaoPatrimonioPublicoImoveisAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacaoPatrimonioPublicoImoveisAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacaoPatrimonioPublicoImoveisAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
