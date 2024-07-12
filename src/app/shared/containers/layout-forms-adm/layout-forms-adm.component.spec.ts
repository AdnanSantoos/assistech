import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFormsAdmComponent } from './layout-forms-adm.component';

describe('LayoutFormsAdmComponent', () => {
  let component: LayoutFormsAdmComponent;
  let fixture: ComponentFixture<LayoutFormsAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutFormsAdmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutFormsAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
