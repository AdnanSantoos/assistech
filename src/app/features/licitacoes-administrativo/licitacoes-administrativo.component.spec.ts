import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicitacoesAdministrativoComponent } from './licitacoes-administrativo.component';

describe('LicitacoesAdministrativoComponent', () => {
  let component: LicitacoesAdministrativoComponent;
  let fixture: ComponentFixture<LicitacoesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicitacoesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicitacoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
