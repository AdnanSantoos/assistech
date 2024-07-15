import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacoesRequerimentoAdministrativoComponent } from './indicacoes-requerimento-administrativo.component';

describe('IndicacoesRequerimentoAdministrativoComponent', () => {
  let component: IndicacoesRequerimentoAdministrativoComponent;
  let fixture: ComponentFixture<IndicacoesRequerimentoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacoesRequerimentoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicacoesRequerimentoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
