/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AtasLicitacoesAdministrativoComponent } from './atas-licitacoes-administrativo.component';

describe('AtasLicitacoesAdministrativoComponent', () => {
  let component: AtasLicitacoesAdministrativoComponent;
  let fixture: ComponentFixture<AtasLicitacoesAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtasLicitacoesAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtasLicitacoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
