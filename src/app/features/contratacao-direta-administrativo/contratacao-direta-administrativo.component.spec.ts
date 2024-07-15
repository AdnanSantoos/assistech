import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratacaoDiretaAdministrativoComponent } from './contratacao-direta-administrativo.component';

describe('ContratacaoDiretaAdministrativoComponent', () => {
  let component: ContratacaoDiretaAdministrativoComponent;
  let fixture: ComponentFixture<ContratacaoDiretaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratacaoDiretaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratacaoDiretaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
