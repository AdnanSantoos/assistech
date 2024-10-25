import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosAbertosAdministrativoComponent } from './dados-abertos-administrativo.component';

describe('DadosAbertosAdministrativoComponent', () => {
  let component: DadosAbertosAdministrativoComponent;
  let fixture: ComponentFixture<DadosAbertosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosAbertosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosAbertosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
