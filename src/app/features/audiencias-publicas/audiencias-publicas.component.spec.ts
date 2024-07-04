import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienciasPublicasComponent } from './audiencias-publicas.component';

describe('AudienciasPublicasComponent', () => {
  let component: AudienciasPublicasComponent;
  let fixture: ComponentFixture<AudienciasPublicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudienciasPublicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudienciasPublicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
