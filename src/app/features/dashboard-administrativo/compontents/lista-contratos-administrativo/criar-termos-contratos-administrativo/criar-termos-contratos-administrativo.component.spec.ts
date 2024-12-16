/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CriarTermosContratosAdministrativoComponent } from './criar-termos-contratos-administrativo.component';

describe('CriarTermosContratosAdministrativoComponent', () => {
  let component: CriarTermosContratosAdministrativoComponent;
  let fixture: ComponentFixture<CriarTermosContratosAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarTermosContratosAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarTermosContratosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
