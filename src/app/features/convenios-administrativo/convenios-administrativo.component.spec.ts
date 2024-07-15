import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveniosAdministrativoComponent } from './convenios-administrativo.component';

describe('ConveniosAdministrativoComponent', () => {
  let component: ConveniosAdministrativoComponent;
  let fixture: ComponentFixture<ConveniosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConveniosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConveniosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
