/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CadastrarNoticiasService } from './cadastrar-noticias.service';

describe('Service: CadastrarNoticias', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastrarNoticiasService]
    });
  });

  it('should ...', inject([CadastrarNoticiasService], (service: CadastrarNoticiasService) => {
    expect(service).toBeTruthy();
  }));
});
