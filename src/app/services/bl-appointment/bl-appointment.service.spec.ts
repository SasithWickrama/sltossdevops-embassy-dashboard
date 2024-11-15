import { TestBed } from '@angular/core/testing';

import { BlAppointmentService } from './bl-appointment.service';

describe('BlAppointmentService', () => {
  let service: BlAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
