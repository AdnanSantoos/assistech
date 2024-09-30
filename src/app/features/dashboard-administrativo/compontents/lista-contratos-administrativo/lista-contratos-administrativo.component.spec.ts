import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaContratosAdministrativoComponent } from './lista-contratos-administrativo.component';

describe('ListaContratosAdministrativoComponent', () => {
  let component: ListaContratosAdministrativoComponent;
  let fixture: ComponentFixture<ListaContratosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaContratosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaContratosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
