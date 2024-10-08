import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPresencaComponent } from './lista-presenca.component';

describe('ListaPresencaComponent', () => {
  let component: ListaPresencaComponent;
  let fixture: ComponentFixture<ListaPresencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPresencaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaPresencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
