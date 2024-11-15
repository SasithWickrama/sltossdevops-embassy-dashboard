import { TestBed } from '@angular/core/testing';

import { MobuserService } from './mobuser.service';

describe('MobuserService', () => {
  let service: MobuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
