import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaRecursosComponent } from './transferencia-recursos.component';

describe('TransferenciaRecursosComponent', () => {
  let component: TransferenciaRecursosComponent;
  let fixture: ComponentFixture<TransferenciaRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciaRecursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferenciaRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
