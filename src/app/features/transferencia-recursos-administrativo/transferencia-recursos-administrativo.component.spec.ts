import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaRecursosAdministrativoComponent } from './transferencia-recursos-administrativo.component';

describe('TransferenciaRecursosAdministrativoComponent', () => {
  let component: TransferenciaRecursosAdministrativoComponent;
  let fixture: ComponentFixture<TransferenciaRecursosAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferenciaRecursosAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferenciaRecursosAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
