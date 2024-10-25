/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JulgamentoContasAdministrativoComponent } from './julgamento-contas-administrativo.component';

describe('JulgamentoContasAdministrativoComponent', () => {
  let component: JulgamentoContasAdministrativoComponent;
  let fixture: ComponentFixture<JulgamentoContasAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JulgamentoContasAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JulgamentoContasAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
