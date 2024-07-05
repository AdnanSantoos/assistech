import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoniosPublicosComponent } from './patrimonios-publicos.component';

describe('PatrimoniosPublicosComponent', () => {
  let component: PatrimoniosPublicosComponent;
  let fixture: ComponentFixture<PatrimoniosPublicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimoniosPublicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrimoniosPublicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
