import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtaDasSessoesComponent } from './ata-das-sessoes.component';

describe('AtaDasSessoesComponent', () => {
  let component: AtaDasSessoesComponent;
  let fixture: ComponentFixture<AtaDasSessoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtaDasSessoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtaDasSessoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
