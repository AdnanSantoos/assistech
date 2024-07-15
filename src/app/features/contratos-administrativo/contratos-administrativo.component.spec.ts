import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosAdministrativoComponent } from './contratos-administrativo.component';

describe('ContratosAdministrativoComponent', () => {
  let component: ContratosAdministrativoComponent;
  let fixture: ComponentFixture<ContratosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
