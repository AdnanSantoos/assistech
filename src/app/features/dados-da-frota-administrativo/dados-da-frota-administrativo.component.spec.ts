import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDaFrotaAdministrativoComponent } from './dados-da-frota-administrativo.component';

describe('DadosDaFrotaAdministrativoComponent', () => {
  let component: DadosDaFrotaAdministrativoComponent;
  let fixture: ComponentFixture<DadosDaFrotaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosDaFrotaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosDaFrotaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
