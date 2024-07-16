import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorPncpAdministrativoComponent } from './gerenciador-pncp-administrativo.component';

describe('GerenciadorPncpAdministrativoComponent', () => {
  let component: GerenciadorPncpAdministrativoComponent;
  let fixture: ComponentFixture<GerenciadorPncpAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciadorPncpAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GerenciadorPncpAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
