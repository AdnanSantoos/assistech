/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DiarioOficialAdministrativoIndexComponent } from './diario-oficial-administrativo-index.component';

describe('DiarioOficialAdministrativoIndexComponent', () => {
  let component: DiarioOficialAdministrativoIndexComponent;
  let fixture: ComponentFixture<DiarioOficialAdministrativoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiarioOficialAdministrativoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioOficialAdministrativoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
