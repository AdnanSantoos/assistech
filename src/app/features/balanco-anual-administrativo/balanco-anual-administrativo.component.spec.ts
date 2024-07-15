import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancoAnualAdministrativoComponent } from './balanco-anual-administrativo.component';

describe('BalancoAnualAdministrativoComponent', () => {
  let component: BalancoAnualAdministrativoComponent;
  let fixture: ComponentFixture<BalancoAnualAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalancoAnualAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalancoAnualAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
