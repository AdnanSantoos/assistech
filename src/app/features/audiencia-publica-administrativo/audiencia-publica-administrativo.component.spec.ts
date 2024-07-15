import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciaPublicaAdministrativoComponent } from './audiencia-publica-administrativo.component';

describe('AudienciaPublicaAdministrativoComponent', () => {
  let component: AudienciaPublicaAdministrativoComponent;
  let fixture: ComponentFixture<AudienciaPublicaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienciaPublicaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudienciaPublicaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
