import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPresidenteComponent } from './agenda-presidente.component';

describe('AgendaPresidenteComponent', () => {
  let component: AgendaPresidenteComponent;
  let fixture: ComponentFixture<AgendaPresidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaPresidenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaPresidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
