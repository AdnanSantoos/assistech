/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformacoesSigilosasAdministrativoComponent } from './informacoes-sigilosas-administrativo.component';

describe('InformacoesSigilosasAdministrativoComponent', () => {
  let component: InformacoesSigilosasAdministrativoComponent;
  let fixture: ComponentFixture<InformacoesSigilosasAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacoesSigilosasAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesSigilosasAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
