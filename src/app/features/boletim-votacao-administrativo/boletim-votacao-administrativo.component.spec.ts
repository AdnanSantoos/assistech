import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimVotacaoAdministrativoComponent } from './boletim-votacao-administrativo.component';

describe('BoletimVotacaoAdministrativoComponent', () => {
  let component: BoletimVotacaoAdministrativoComponent;
  let fixture: ComponentFixture<BoletimVotacaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletimVotacaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoletimVotacaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
