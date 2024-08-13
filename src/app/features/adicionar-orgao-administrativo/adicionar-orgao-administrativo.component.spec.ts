import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarOrgaoAdministrativoComponent } from './adicionar-orgao-administrativo.component';

describe('AdicionarOrgaoAdministrativoComponent', () => {
  let component: AdicionarOrgaoAdministrativoComponent;
  let fixture: ComponentFixture<AdicionarOrgaoAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarOrgaoAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarOrgaoAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
