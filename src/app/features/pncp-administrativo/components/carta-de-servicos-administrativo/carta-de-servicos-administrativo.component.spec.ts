import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaDeServicosAdministrativoComponent } from './carta-de-servicos-administrativo.component';

describe('CartaDeServicosAdministrativoComponent', () => {
  let component: CartaDeServicosAdministrativoComponent;
  let fixture: ComponentFixture<CartaDeServicosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaDeServicosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaDeServicosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
