import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceteFinanceiroComponent } from './balancete-financeiro.component';

describe('BalanceteFinanceiroComponent', () => {
  let component: BalanceteFinanceiroComponent;
  let fixture: ComponentFixture<BalanceteFinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceteFinanceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalanceteFinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
