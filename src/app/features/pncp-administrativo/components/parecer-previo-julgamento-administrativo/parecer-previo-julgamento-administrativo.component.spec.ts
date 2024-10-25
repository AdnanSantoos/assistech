/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ParecerPrevioJulgamentoAdministrativoComponent } from './parecer-previo-julgamento-administrativo.component';

describe('ParecerPrevioJulgamentoAdministrativoComponent', () => {
  let component: ParecerPrevioJulgamentoAdministrativoComponent;
  let fixture: ComponentFixture<ParecerPrevioJulgamentoAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParecerPrevioJulgamentoAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParecerPrevioJulgamentoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
