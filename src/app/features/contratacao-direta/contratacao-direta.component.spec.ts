import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratacaoDiretaComponent } from './contratacao-direta.component';

describe('ContratacaoDiretaComponent', () => {
  let component: ContratacaoDiretaComponent;
  let fixture: ComponentFixture<ContratacaoDiretaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratacaoDiretaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContratacaoDiretaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
