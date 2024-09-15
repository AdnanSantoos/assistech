import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarDiarioOficialAdministrativoComponent } from './publicar-diario-oficial-administrativo.component';

describe('PublicarDiarioOficialAdministrativoComponent', () => {
  let component: PublicarDiarioOficialAdministrativoComponent;
  let fixture: ComponentFixture<PublicarDiarioOficialAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarDiarioOficialAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicarDiarioOficialAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
