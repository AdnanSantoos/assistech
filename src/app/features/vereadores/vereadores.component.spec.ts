import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VereadoresComponent } from './vereadores.component';

describe('VereadoresComponent', () => {
  let component: VereadoresComponent;
  let fixture: ComponentFixture<VereadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VereadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VereadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
