/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelacaoPatrimonioPublicoMoveisAdministrativoComponent } from './relacao-patrimonio-publico-moveis-administrativo.component';

describe('RelacaoPatrimonioPublicoMoveisAdministrativoComponent', () => {
  let component: RelacaoPatrimonioPublicoMoveisAdministrativoComponent;
  let fixture: ComponentFixture<RelacaoPatrimonioPublicoMoveisAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacaoPatrimonioPublicoMoveisAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacaoPatrimonioPublicoMoveisAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
