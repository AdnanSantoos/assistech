import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotasParaServicoParlamentarAdministrativoComponent } from './cotas-para-servico-parlamentar-administrativo.component';

describe('CotasParaServicoParlamentarAdministrativoComponent', () => {
  let component: CotasParaServicoParlamentarAdministrativoComponent;
  let fixture: ComponentFixture<CotasParaServicoParlamentarAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CotasParaServicoParlamentarAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CotasParaServicoParlamentarAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
