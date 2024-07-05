import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislacaoMunicipalComponent } from './legislacao-municipal.component';

describe('LegislacaoMunicipalComponent', () => {
  let component: LegislacaoMunicipalComponent;
  let fixture: ComponentFixture<LegislacaoMunicipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegislacaoMunicipalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegislacaoMunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
