import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacoesRequerimentosComponent } from './indicacoes-requerimentos.component';

describe('IndicacoesRequerimentosComponent', () => {
  let component: IndicacoesRequerimentosComponent;
  let fixture: ComponentFixture<IndicacoesRequerimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacoesRequerimentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicacoesRequerimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
