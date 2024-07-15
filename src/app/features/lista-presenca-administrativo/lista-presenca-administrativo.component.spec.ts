import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPresencaAdministrativoComponent } from './lista-presenca-administrativo.component';

describe('ListaPresencaAdministrativoComponent', () => {
  let component: ListaPresencaAdministrativoComponent;
  let fixture: ComponentFixture<ListaPresencaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPresencaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPresencaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
