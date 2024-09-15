import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesAdministrativoComponent } from './unidades-administrativo.component';

describe('UnidadesAdministrativoComponent', () => {
  let component: UnidadesAdministrativoComponent;
  let fixture: ComponentFixture<UnidadesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
