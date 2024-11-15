import { TestBed } from '@angular/core/testing';

import { WebuserService } from './webuser.service';

describe('WebuserService', () => {
  let service: WebuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
