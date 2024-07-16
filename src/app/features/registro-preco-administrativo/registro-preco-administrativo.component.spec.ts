import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrecoAdministrativoComponent } from './registro-preco-administrativo.component';

describe('RegistroPrecoAdministrativoComponent', () => {
  let component: RegistroPrecoAdministrativoComponent;
  let fixture: ComponentFixture<RegistroPrecoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPrecoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroPrecoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
