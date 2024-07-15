import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaisLicitacoesAdministrativoComponent } from './editais-licitacoes-administrativo.component';

describe('EditaisLicitacoesAdministrativoComponent', () => {
  let component: EditaisLicitacoesAdministrativoComponent;
  let fixture: ComponentFixture<EditaisLicitacoesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaisLicitacoesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditaisLicitacoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
