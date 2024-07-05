import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosProvidenciaComponent } from './pedidos-providencia.component';

describe('PedidosProvidenciaComponent', () => {
  let component: PedidosProvidenciaComponent;
  let fixture: ComponentFixture<PedidosProvidenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosProvidenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosProvidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
