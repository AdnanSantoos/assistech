import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimoniosPublicosAdministrativoComponent } from './patrimonios-publicos-administrativo.component';

describe('PatrimoniosPublicosAdministrativoComponent', () => {
  let component: PatrimoniosPublicosAdministrativoComponent;
  let fixture: ComponentFixture<PatrimoniosPublicosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimoniosPublicosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatrimoniosPublicosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
