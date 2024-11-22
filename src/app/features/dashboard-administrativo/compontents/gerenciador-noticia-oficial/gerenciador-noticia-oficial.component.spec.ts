/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GerenciadorNoticiaOficialComponent } from './gerenciador-noticia-oficial.component';

describe('GerenciadorNoticiaOficialComponent', () => {
  let component: GerenciadorNoticiaOficialComponent;
  let fixture: ComponentFixture<GerenciadorNoticiaOficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciadorNoticiaOficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorNoticiaOficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
