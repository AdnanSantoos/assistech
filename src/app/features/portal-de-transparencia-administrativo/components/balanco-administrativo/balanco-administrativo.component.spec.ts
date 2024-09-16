import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancoAdministrativoComponent } from './balanco-administrativo.component';

describe('BalancoAdministrativoComponent', () => {
  let component: BalancoAdministrativoComponent;
  let fixture: ComponentFixture<BalancoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalancoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BalancoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
