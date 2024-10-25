import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarComissoesAdministrativoComponent } from './adicionar-comissoes-administrativo.component';

describe('AdicionarComissoesAdministrativoComponent', () => {
  let component: AdicionarComissoesAdministrativoComponent;
  let fixture: ComponentFixture<AdicionarComissoesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarComissoesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarComissoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
