import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacoesDeliberacoesAdministrativoComponent } from './indicacoes-deliberacoes-administrativo.component';

describe('IndicacoesDeliberacoesAdministrativoComponent', () => {
  let component: IndicacoesDeliberacoesAdministrativoComponent;
  let fixture: ComponentFixture<IndicacoesDeliberacoesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicacoesDeliberacoesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndicacoesDeliberacoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
