import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoInformacaoComponent } from './acesso-informacao.component';

describe('AcessoInformacaoComponent', () => {
  let component: AcessoInformacaoComponent;
  let fixture: ComponentFixture<AcessoInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoInformacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
