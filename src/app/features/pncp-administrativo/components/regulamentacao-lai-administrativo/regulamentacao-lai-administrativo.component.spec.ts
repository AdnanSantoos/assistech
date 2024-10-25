/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegulamentacaoLaiAdministrativoComponent } from './regulamentacao-lai-administrativo.component';

describe('RegulamentacaoLaiAdministrativoComponent', () => {
  let component: RegulamentacaoLaiAdministrativoComponent;
  let fixture: ComponentFixture<RegulamentacaoLaiAdministrativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulamentacaoLaiAdministrativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulamentacaoLaiAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
