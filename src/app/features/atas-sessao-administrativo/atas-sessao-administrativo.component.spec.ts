import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtasSessaoAdministrativoComponent } from './atas-sessao-administrativo.component';

describe('AtasSessaoAdministrativoComponent', () => {
  let component: AtasSessaoAdministrativoComponent;
  let fixture: ComponentFixture<AtasSessaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtasSessaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtasSessaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
