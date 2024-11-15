import { TestBed } from '@angular/core/testing';

import { WebroleService } from './webrole.service';

describe('WebroleService', () => {
  let service: WebroleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebroleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
