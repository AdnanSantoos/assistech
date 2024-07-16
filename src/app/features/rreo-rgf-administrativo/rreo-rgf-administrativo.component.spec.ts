import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RreoRgfAdministrativoComponent } from './rreo-rgf-administrativo.component';

describe('RreoRgfAdministrativoComponent', () => {
  let component: RreoRgfAdministrativoComponent;
  let fixture: ComponentFixture<RreoRgfAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RreoRgfAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RreoRgfAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
