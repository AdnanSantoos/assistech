import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiariaComponent } from './diaria.component';

describe('DiariaComponent', () => {
  let component: DiariaComponent;
  let fixture: ComponentFixture<DiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiariaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
