import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpaLoaLdoAdministrativoComponent } from './ppa-loa-ldo-administrativo.component';

describe('PpaLoaLdoAdministrativoComponent', () => {
  let component: PpaLoaLdoAdministrativoComponent;
  let fixture: ComponentFixture<PpaLoaLdoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PpaLoaLdoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PpaLoaLdoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
