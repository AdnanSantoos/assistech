import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MocoesComponent } from './mocoes.component';

describe('MocoesComponent', () => {
  let component: MocoesComponent;
  let fixture: ComponentFixture<MocoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MocoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MocoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
