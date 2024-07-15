import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegislacaoMunicipalAdministrativoComponent } from './legislacao-municipal-administrativo.component';

describe('LegislacaoMunicipalAdministrativoComponent', () => {
  let component: LegislacaoMunicipalAdministrativoComponent;
  let fixture: ComponentFixture<LegislacaoMunicipalAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegislacaoMunicipalAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegislacaoMunicipalAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
