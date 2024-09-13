import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioOficialAnosComponent } from './diario-oficial-anos.component';

describe('DiarioOficialAnosComponent', () => {
  let component: DiarioOficialAnosComponent;
  let fixture: ComponentFixture<DiarioOficialAnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioOficialAnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiarioOficialAnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
