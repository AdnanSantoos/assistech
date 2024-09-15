import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarUnidadesAdministrativoComponent } from './adicionar-unidades-administrativo.component';

describe('AdicionarUnidadesAdministrativoComponent', () => {
  let component: AdicionarUnidadesAdministrativoComponent;
  let fixture: ComponentFixture<AdicionarUnidadesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarUnidadesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarUnidadesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
