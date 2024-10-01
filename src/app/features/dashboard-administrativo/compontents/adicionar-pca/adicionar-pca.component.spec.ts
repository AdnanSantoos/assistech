import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPcaComponent } from './adicionar-pca.component';

describe('AdicionarPcaComponent', () => {
  let component: AdicionarPcaComponent;
  let fixture: ComponentFixture<AdicionarPcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPcaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarPcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
