/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlanoPlurianualAdministrativoComponent } from './plano-plurianual-administrativo.component';

describe('PlanoPlurianualAdministrativoComponent', () => {
  let component: PlanoPlurianualAdministrativoComponent;
  let fixture: ComponentFixture<PlanoPlurianualAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoPlurianualAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoPlurianualAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
