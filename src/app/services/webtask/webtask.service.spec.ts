import { TestBed } from '@angular/core/testing';

import { WebtaskService } from './webtask.service';

describe('WebtaskService', () => {
  let service: WebtaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebtaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
