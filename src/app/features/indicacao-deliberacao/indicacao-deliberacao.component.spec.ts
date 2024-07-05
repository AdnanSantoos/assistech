import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacaoDeliberacaoComponent } from './indicacao-deliberacao.component';

describe('IndicacaoDeliberacaoComponent', () => {
  let component: IndicacaoDeliberacaoComponent;
  let fixture: ComponentFixture<IndicacaoDeliberacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacaoDeliberacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicacaoDeliberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
