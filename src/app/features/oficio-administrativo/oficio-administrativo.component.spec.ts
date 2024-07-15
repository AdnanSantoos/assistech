import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficioAdministrativoComponent } from './oficio-administrativo.component';

describe('OficioAdministrativoComponent', () => {
  let component: OficioAdministrativoComponent;
  let fixture: ComponentFixture<OficioAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficioAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OficioAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
