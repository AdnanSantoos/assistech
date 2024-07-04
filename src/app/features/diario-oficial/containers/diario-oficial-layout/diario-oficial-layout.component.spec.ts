import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioOficialLayoutComponent } from './diario-oficial-layout.component';

describe('DiarioOficialLayoutComponent', () => {
  let component: DiarioOficialLayoutComponent;
  let fixture: ComponentFixture<DiarioOficialLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioOficialLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiarioOficialLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
