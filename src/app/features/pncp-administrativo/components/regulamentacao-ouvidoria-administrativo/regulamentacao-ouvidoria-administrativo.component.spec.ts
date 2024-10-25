/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegulamentacaoOuvidoriaAdministrativoComponent } from './regulamentacao-ouvidoria-administrativo.component';

describe('RegulamentacaoOuvidoriaAdministrativoComponent', () => {
  let component: RegulamentacaoOuvidoriaAdministrativoComponent;
  let fixture: ComponentFixture<RegulamentacaoOuvidoriaAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulamentacaoOuvidoriaAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulamentacaoOuvidoriaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
