import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGeralComponent } from './filtro-geral.component';

describe('FiltroGeralComponent', () => {
  let component: FiltroGeralComponent;
  let fixture: ComponentFixture<FiltroGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroGeralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
