import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtosAdmissionaisComponent } from './atos-admissionais.component';

describe('AtosAdmissionaisComponent', () => {
  let component: AtosAdmissionaisComponent;
  let fixture: ComponentFixture<AtosAdmissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtosAdmissionaisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtosAdmissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
