import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoInformacaoAdministrativoComponent } from './acesso-informacao-administrativo.component';

describe('AcessoInformacaoAdministrativoComponent', () => {
  let component: AcessoInformacaoAdministrativoComponent;
  let fixture: ComponentFixture<AcessoInformacaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcessoInformacaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcessoInformacaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
