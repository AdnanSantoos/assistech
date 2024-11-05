import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralNewsDetalhesComponent } from './general-news-detalhes.component';

describe('GeneralNewsDetalhesComponent', () => {
  let component: GeneralNewsDetalhesComponent;
  let fixture: ComponentFixture<GeneralNewsDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralNewsDetalhesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralNewsDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
