import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimentoInternoComponent } from './regimento-interno.component';

describe('RegimentoInternoComponent', () => {
  let component: RegimentoInternoComponent;
  let fixture: ComponentFixture<RegimentoInternoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegimentoInternoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegimentoInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
