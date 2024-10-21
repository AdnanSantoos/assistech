import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarNoticiasComponent } from './cadastrar-noticias.component';

describe('CadastrarNoticiasComponent', () => {
  let component: CadastrarNoticiasComponent;
  let fixture: ComponentFixture<CadastrarNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarNoticiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
