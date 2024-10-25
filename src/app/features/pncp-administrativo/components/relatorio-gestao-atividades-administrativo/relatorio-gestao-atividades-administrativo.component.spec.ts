/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RelatorioGestaoAtividadesAdministrativoComponent } from './relatorio-gestao-atividades-administrativo.component';

describe('RelatorioGestaoAtividadesAdministrativoComponent', () => {
  let component: RelatorioGestaoAtividadesAdministrativoComponent;
  let fixture: ComponentFixture<RelatorioGestaoAtividadesAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioGestaoAtividadesAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioGestaoAtividadesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
