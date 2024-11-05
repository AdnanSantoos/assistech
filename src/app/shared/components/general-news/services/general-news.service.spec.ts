import { TestBed } from '@angular/core/testing';

import { GeneralNewsService } from './general-news.service';

describe('GeneralNewsService', () => {
  let service: GeneralNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
