import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioOficialVisualizacaoComponent } from './diario-oficial-visualizacao.component';

describe('DiarioOficialVisualizacaoComponent', () => {
  let component: DiarioOficialVisualizacaoComponent;
  let fixture: ComponentFixture<DiarioOficialVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioOficialVisualizacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiarioOficialVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
