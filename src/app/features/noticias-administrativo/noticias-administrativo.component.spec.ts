import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasAdministrativoComponent } from './noticias-administrativo.component';

describe('NoticiasAdministrativoComponent', () => {
  let component: NoticiasAdministrativoComponent;
  let fixture: ComponentFixture<NoticiasAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiasAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
