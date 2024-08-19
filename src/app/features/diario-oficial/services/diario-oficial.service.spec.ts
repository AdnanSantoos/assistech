import { TestBed } from '@angular/core/testing';

import { DiarioOficialService } from './diario-oficial.service';

describe('DiarioOficialService', () => {
  let service: DiarioOficialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiarioOficialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
