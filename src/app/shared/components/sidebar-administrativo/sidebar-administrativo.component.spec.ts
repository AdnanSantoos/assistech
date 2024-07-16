import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAdministrativoComponent } from './sidebar-administrativo.component';

describe('SidebarAdministrativoComponent', () => {
  let component: SidebarAdministrativoComponent;
  let fixture: ComponentFixture<SidebarAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
