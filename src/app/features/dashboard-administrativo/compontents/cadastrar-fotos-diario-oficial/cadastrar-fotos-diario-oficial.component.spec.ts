/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CadastrarFotosDiarioOficialComponent } from './cadastrar-fotos-diario-oficial.component';

describe('CadastrarFotosDiarioOficialComponent', () => {
  let component: CadastrarFotosDiarioOficialComponent;
  let fixture: ComponentFixture<CadastrarFotosDiarioOficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarFotosDiarioOficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarFotosDiarioOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
