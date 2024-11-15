import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlAppointmentComponent } from './bl-appointment.component';

describe('BlAppointmentComponent', () => {
  let component: BlAppointmentComponent;
  let fixture: ComponentFixture<BlAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
