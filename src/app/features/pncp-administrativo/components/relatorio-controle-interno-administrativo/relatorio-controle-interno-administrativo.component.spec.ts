/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelatorioControleInternoAdministrativoComponent } from './relatorio-controle-interno-administrativo.component';

describe('RelatorioControleInternoAdministrativoComponent', () => {
  let component: RelatorioControleInternoAdministrativoComponent;
  let fixture: ComponentFixture<RelatorioControleInternoAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioControleInternoAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioControleInternoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
