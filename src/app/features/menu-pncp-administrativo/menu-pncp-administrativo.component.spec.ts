import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPncpAdministrativoComponent } from './menu-pncp-administrativo.component';

describe('MenuPncpAdministrativoComponent', () => {
  let component: MenuPncpAdministrativoComponent;
  let fixture: ComponentFixture<MenuPncpAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPncpAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPncpAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
