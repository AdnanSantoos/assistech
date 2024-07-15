import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoesAdministrativoComponent } from './mocoes-administrativo.component';

describe('MocoesAdministrativoComponent', () => {
  let component: MocoesAdministrativoComponent;
  let fixture: ComponentFixture<MocoesAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MocoesAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MocoesAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
