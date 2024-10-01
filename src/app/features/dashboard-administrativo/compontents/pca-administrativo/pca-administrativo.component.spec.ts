import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcaAdministrativoComponent } from './pca-administrativo.component';

describe('PcaAdministrativoComponent', () => {
  let component: PcaAdministrativoComponent;
  let fixture: ComponentFixture<PcaAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PcaAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PcaAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
