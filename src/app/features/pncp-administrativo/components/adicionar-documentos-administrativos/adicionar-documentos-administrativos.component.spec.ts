/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdicionarDocumentosAdministrativosComponent } from './adicionar-documentos-administrativos.component';

describe('AdicionarDocumentosAdministrativosComponent', () => {
  let component: AdicionarDocumentosAdministrativosComponent;
  let fixture: ComponentFixture<AdicionarDocumentosAdministrativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarDocumentosAdministrativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarDocumentosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
