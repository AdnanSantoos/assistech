import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPrecoComponent } from './registro-preco.component';

describe('RegistroPrecoComponent', () => {
  let component: RegistroPrecoComponent;
  let fixture: ComponentFixture<RegistroPrecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPrecoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroPrecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
