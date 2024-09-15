/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PncpAdministrativoIndexComponent } from './pncp-administrativo-index.component';

describe('PncpAdministrativoIndexComponent', () => {
  let component: PncpAdministrativoIndexComponent;
  let fixture: ComponentFixture<PncpAdministrativoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PncpAdministrativoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PncpAdministrativoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
