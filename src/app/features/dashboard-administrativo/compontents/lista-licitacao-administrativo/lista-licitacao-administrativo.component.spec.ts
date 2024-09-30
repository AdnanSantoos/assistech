import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaLicitacaoAdministrativoComponent } from './lista-licitacao-administrativo.component';

describe('ListaLicitacaoAdministrativoComponent', () => {
  let component: ListaLicitacaoAdministrativoComponent;
  let fixture: ComponentFixture<ListaLicitacaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaLicitacaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaLicitacaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
