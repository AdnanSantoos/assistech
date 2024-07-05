import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RreoRgfComponent } from './rreo-rgf.component';

describe('RreoRgfComponent', () => {
  let component: RreoRgfComponent;
  let fixture: ComponentFixture<RreoRgfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RreoRgfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RreoRgfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
