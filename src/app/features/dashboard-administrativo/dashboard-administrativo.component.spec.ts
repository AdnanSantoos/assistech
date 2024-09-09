import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdministrativoComponent } from './dashboard-administrativo.component';

describe('DashboardAdministrativoComponent', () => {
  let component: DashboardAdministrativoComponent;
  let fixture: ComponentFixture<DashboardAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
