import { TestBed } from '@angular/core/testing';

import { PublicarDiarioOficialService } from './publicar-diario-oficial.service';

describe('PublicarDiarioOficialService', () => {
  let service: PublicarDiarioOficialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicarDiarioOficialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
