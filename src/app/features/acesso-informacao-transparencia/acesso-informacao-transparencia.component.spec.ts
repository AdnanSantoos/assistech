import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoInformacaoTransparenciaComponent } from './acesso-informacao-transparencia.component';

describe('AcessoInformacaoTransparenciaComponent', () => {
  let component: AcessoInformacaoTransparenciaComponent;
  let fixture: ComponentFixture<AcessoInformacaoTransparenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoInformacaoTransparenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoInformacaoTransparenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
