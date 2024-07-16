import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDiarioOficialAdministrativoComponent } from './menu-diario-oficial-administrativo.component';

describe('MenuDiarioOficialAdministrativoComponent', () => {
  let component: MenuDiarioOficialAdministrativoComponent;
  let fixture: ComponentFixture<MenuDiarioOficialAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDiarioOficialAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuDiarioOficialAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
