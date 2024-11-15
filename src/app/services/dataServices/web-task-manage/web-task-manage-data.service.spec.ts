import { TestBed } from '@angular/core/testing';

import { WebTaskManageDataService } from './web-task-manage-data.service';

describe('WebTaskManageDataService', () => {
  let service: WebTaskManageDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebTaskManageDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
