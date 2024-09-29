import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorDiarioOficialAdministrativoComponent } from './gerenciador-diario-oficial-administrativo.component';

describe('GerenciadorDiarioOficialAdministrativoComponent', () => {
  let component: GerenciadorDiarioOficialAdministrativoComponent;
  let fixture: ComponentFixture<GerenciadorDiarioOficialAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciadorDiarioOficialAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciadorDiarioOficialAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
