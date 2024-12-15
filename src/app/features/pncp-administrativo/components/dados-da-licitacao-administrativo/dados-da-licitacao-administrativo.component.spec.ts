import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDaLicitacaoAdministrativoComponent } from './dados-da-licitacao-administrativo.component';

describe('DadosDaLicitacaoAdministrativoComponent', () => {
  let component: DadosDaLicitacaoAdministrativoComponent;
  let fixture: ComponentFixture<DadosDaLicitacaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosDaLicitacaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosDaLicitacaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
