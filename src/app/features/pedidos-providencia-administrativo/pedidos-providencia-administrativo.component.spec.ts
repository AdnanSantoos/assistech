import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosProvidenciaAdministrativoComponent } from './pedidos-providencia-administrativo.component';

describe('PedidosProvidenciaAdministrativoComponent', () => {
  let component: PedidosProvidenciaAdministrativoComponent;
  let fixture: ComponentFixture<PedidosProvidenciaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosProvidenciaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosProvidenciaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
