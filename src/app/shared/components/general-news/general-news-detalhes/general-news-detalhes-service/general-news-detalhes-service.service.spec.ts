import { TestBed } from '@angular/core/testing';

import { GeneralNewsDetalhesServiceService } from './general-news-detalhes-service.service';

describe('GeneralNewsDetalhesServiceService', () => {
  let service: GeneralNewsDetalhesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralNewsDetalhesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
