/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LicitantesContratadosAdministrativoComponent } from './licitantes-contratados-administrativo.component';

describe('LicitantesContratadosAdministrativoComponent', () => {
  let component: LicitantesContratadosAdministrativoComponent;
  let fixture: ComponentFixture<LicitantesContratadosAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicitantesContratadosAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicitantesContratadosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
