import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment/appointment';
import { AppointmentService } from '../services/appointment/appointment.service';
import { BlAppointmentService } from '../services/bl-appointment/bl-appointment.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private subject = new Subject<any>();
  private service = new Subject<any>();
  private date = new Subject<any>();
  private category = new Subject<any>();
  private total = new Subject<any>();
  private appointSelectedTab = new Subject<any>();

  private allTotal = new Subject<any>();
  private pendingTotal = new Subject<any>();
  private completeTotal = new Subject<any>();
  private allAppointment = new Subject<any>();
  private pendingAppointment = new Subject<any>();
  private completeAppointment = new Subject<any>();

  private appointmentBlockedTimeSlotList = new Subject<any>();

  private appointmentsByService:any = {};
  private allAppointmentsByService:any = {};
  private pendingAppointmentsByService:any = {};
  private completeAppointmentsByService:any = {};

  constructor(private appointmentService: AppointmentService, private blAppointmentService: BlAppointmentService) { }

  /** SET Appointments Group By & Total count- Call API to get appoinments, group by service and total count */
  setAppointments(date:string) {
    this.appointmentsByService = {};
    this.appointmentService.getTodayAppointments(date)
      .subscribe(
        appointments => {
          this.total.next(appointments['data'].length);
          appointments['data'].forEach(item => {
            this.appointmentsByService[item.service_type] = [ ...( this.appointmentsByService[item.service_type] || [] ), item];
          });
          this.subject.next(this.appointmentsByService);
        }
      );
  }

  /** GET Appointments Group By  */
  getAppointments(): Observable<any> {
    return this.subject.asObservable();
  }

  /** GET Appointments Count Group By  */
  getAppointmentsCount(): Observable<any> {
    return this.total.asObservable();
  }

  /** SET all Appointments Group By service & Total count- Call API to get appoinments, group by service and total count */
  setAllAppointments(date:string, category:string) {
    this.allAppointmentsByService = {};
    this.appointmentService.getAllAppointments(date, category)
      .subscribe(
        appointments => {
          this.allTotal.next(appointments['data'].length);
          appointments['data'].forEach(item => {
            this.allAppointmentsByService[item.service_type] = [ ...( this.allAppointmentsByService[item.service_type] || [] ), item];
          });
          this.allAppointment.next(this.allAppointmentsByService);
        }
      );
  }

  /** GET All Appointments Group By  */
  getAllAppointments(): Observable<any> {
    return this.allAppointment.asObservable();
  }

  /** GET All Appointments Count Group By  */
  getAllAppointmentsCount(): Observable<any> {
    return this.allTotal.asObservable();
  }

  /** SET pending Appointments Group By service & Total count- Call API to get appoinments, group by service and total count */
  setPendingAppointments(date:string, category:string) {
    this.pendingAppointmentsByService = {};
    this.appointmentService.getPendingAppointments(date, category)
      .subscribe(
        appointments => {
          this.pendingTotal.next(appointments['data'].length);
          appointments['data'].forEach(item => {
            this.pendingAppointmentsByService[item.service_type] = [ ...( this.pendingAppointmentsByService[item.service_type] || [] ), item];
          });
          this.pendingAppointment.next(this.pendingAppointmentsByService);
        }
      );
  }

   /** GET Pending Appointments Group By  */
   getPendingAppointments(): Observable<any> {
    return this.pendingAppointment.asObservable();
  }

  /** GET Pending Appointments Count Group By  */
  getPendingAppointmentsCount(): Observable<any> {
    return this.pendingTotal.asObservable();
  }

  /** SET Complete Appointments Group By service & Total count- Call API to get appoinments, group by service and total count */
  setCompleteAppointments(date:string, category:string) {
    this.completeAppointmentsByService = {};
    this.appointmentService.getCompleteAppointments(date, category)
      .subscribe(
        appointments => {
          this.completeTotal.next(appointments['data'].length);
          appointments['data'].forEach(item => {
            this.completeAppointmentsByService[item.service_type] = [ ...( this.completeAppointmentsByService[item.service_type] || [] ), item];
          });
          this.completeAppointment.next(this.completeAppointmentsByService);
        }
      );
  }

  /** GET Complete Appointments Group By  */
  getCompleteAppointments(): Observable<any> {
    return this.completeAppointment.asObservable();
  }

  /** GET Complete Appointments Count Group By  */
  getCompleteAppointmentsCount(): Observable<any> {
    return this.completeTotal.asObservable();
  }


  /** SET Service - selected service on dashboard*/
  setService(service:string) {
    this.service.next(service);
  }

  /** GET Service - selected service on dashboard*/
  getService(): Observable<any> {
    return this.service.asObservable();
  }

  /** SET Date - selected date on dashboard*/
  setDate(date:string) {
    this.date.next(date);
  }

  /** GET Date - selected date on dashboard*/
  getDate(): Observable<any> {
    return this.date.asObservable();
  }

   /** SET Category - selected category on dashboard*/
   setCategory(category:string) {
    this.category.next(category);
  }

  /** GET Category - selected category on dashboard*/
  getCategory(): Observable<any> {
    return this.category.asObservable();
  }

  /** SET Active Tab - selected tab on appointment page*/
  setActiveTabAppointment(tab:Number) {
    this.appointSelectedTab.next(tab);

  }

  /** GET Active Tab - selected tab on appointment page*/
  getActiveTabAppointment(): Observable<any> {
    return this.appointSelectedTab.asObservable();
  }

  /** set blocked appointments time slot list */
  setBlockAppointmentsTimeSlot(appointBlDate: string, serviceCatagory:string) {
    this.blAppointmentService.getAppointmentsTimeSlot(appointBlDate, serviceCatagory)
      .subscribe(
        result => {
          this.appointmentBlockedTimeSlotList.next(result['data']);
        }
      );
  }

  /** get blocked appointments time slot list */
  getBlockAppointmentsTimeSlot(): Observable<any> {
    return this.appointmentBlockedTimeSlotList.asObservable();
  }
  
}
