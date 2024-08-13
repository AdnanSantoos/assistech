import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgaoAdministrativoComponent } from './orgao-administrativo.component';

describe('OrgaoAdministrativoComponent', () => {
  let component: OrgaoAdministrativoComponent;
  let fixture: ComponentFixture<OrgaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
