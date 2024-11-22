/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClienteAdministrativoService } from './cliente-administrativo.service';

describe('Service: ClienteAdministrativo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteAdministrativoService]
    });
  });

  it('should ...', inject([ClienteAdministrativoService], (service: ClienteAdministrativoService) => {
    expect(service).toBeTruthy();
  }));
});
