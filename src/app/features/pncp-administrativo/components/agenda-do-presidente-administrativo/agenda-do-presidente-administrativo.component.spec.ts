import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDoPresidenteAdministrativoComponent } from './agenda-do-presidente-administrativo.component';

describe('AgendaDoPresidenteAdministrativoComponent', () => {
  let component: AgendaDoPresidenteAdministrativoComponent;
  let fixture: ComponentFixture<AgendaDoPresidenteAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaDoPresidenteAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaDoPresidenteAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
