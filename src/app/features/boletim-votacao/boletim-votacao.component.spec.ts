import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletimVotacaoComponent } from './boletim-votacao.component';

describe('BoletimVotacaoComponent', () => {
  let component: BoletimVotacaoComponent;
  let fixture: ComponentFixture<BoletimVotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoletimVotacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoletimVotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
