import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTransparenciaComponent } from './home-transparencia.component';

describe('HomeTransparenciaComponent', () => {
  let component: HomeTransparenciaComponent;
  let fixture: ComponentFixture<HomeTransparenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTransparenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTransparenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
