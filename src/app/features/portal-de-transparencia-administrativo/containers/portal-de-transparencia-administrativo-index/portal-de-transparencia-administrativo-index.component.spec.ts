/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PortalDeTransparenciaAdministrativoIndexComponent } from './portal-de-transparencia-administrativo-index.component';

describe('PortalDeTransparenciaAdministrativoIndexComponent', () => {
  let component: PortalDeTransparenciaAdministrativoIndexComponent;
  let fixture: ComponentFixture<PortalDeTransparenciaAdministrativoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalDeTransparenciaAdministrativoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalDeTransparenciaAdministrativoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
