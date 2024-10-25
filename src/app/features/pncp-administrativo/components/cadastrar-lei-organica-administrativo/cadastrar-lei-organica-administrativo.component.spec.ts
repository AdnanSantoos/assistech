/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarLeiOrganicaAdministrativoComponent } from './cadastrar-lei-organica-administrativo.component';

describe('CadastrarLeiOrganicaAdministrativoComponent', () => {
  let component: CadastrarLeiOrganicaAdministrativoComponent;
  let fixture: ComponentFixture<CadastrarLeiOrganicaAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarLeiOrganicaAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarLeiOrganicaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
