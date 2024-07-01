import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNewsComponent } from './general-news.component';

describe('GeneralNewsComponent', () => {
  let component: GeneralNewsComponent;
  let fixture: ComponentFixture<GeneralNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
