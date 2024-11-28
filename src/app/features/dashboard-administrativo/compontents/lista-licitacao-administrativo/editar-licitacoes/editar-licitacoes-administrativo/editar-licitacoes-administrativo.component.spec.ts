/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditarLicitacoesAdministrativoComponent } from './editar-licitacoes-administrativo.component';

describe('EditarLicitacoesAdministrativoComponent', () => {
  let component: EditarLicitacoesAdministrativoComponent;
  let fixture: ComponentFixture<EditarLicitacoesAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLicitacoesAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLicitacoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
