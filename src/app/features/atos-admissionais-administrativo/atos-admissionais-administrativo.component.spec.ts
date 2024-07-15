import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtosAdmissionaisAdministrativoComponent } from './atos-admissionais-administrativo.component';

describe('AtosAdmissionaisAdministrativoComponent', () => {
  let component: AtosAdmissionaisAdministrativoComponent;
  let fixture: ComponentFixture<AtosAdmissionaisAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtosAdmissionaisAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtosAdmissionaisAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
