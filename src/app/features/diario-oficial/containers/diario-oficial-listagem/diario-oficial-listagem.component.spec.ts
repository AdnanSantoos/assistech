import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioOficialListagemComponent } from './diario-oficial-listagem.component';

describe('DiarioOficialListagemComponent', () => {
  let component: DiarioOficialListagemComponent;
  let fixture: ComponentFixture<DiarioOficialListagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiarioOficialListagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiarioOficialListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
