import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Appointment } from '../../../interfaces/appointment/appointment';
import { StorageService } from '../../../services/storage.service';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { DataService } from '../../../services/data.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss']
})
export class DetailsContainerComponent implements OnInit {

  serviceSubscription: Subscription;
  appointSubscription: Subscription;
  dateSubscription: Subscription;

  isLoggedIn = false;
  service: string;
  date: string;
  appointments:Appointment[];
  public appointmentsByaService:Appointment[];
  public showTable = true;

  constructor(private storageService: StorageService, private router: Router, private appointmentService: AppointmentService, private dataService: DataService) {

    /**   call at contructor - get appointments by a date  group by service**/
    this.triggerAppoimentSubcription();
    /**   call at contructor - get selected date  **/
    this.triggerDateSubcription();
    /**   call at contructor - get selected service  **/
    this.triggerServiceSubcription();
    
  }

  /**   ngOnInit  **/
  ngOnInit(): void {

    /**   check for user login  **/
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }else{
      this.router.navigate(['/login']);
    }

    /**   if login is successful  **/
    if(this.isLoggedIn){

    }
  }

  ngOnDestroy() {
    // unsubscibe to ensure no memory leaks
    this.serviceSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
    this.appointSubscription.unsubscribe();
  }

  /** Subscription get appointments by a date  group by service  from dataService layer**/
  triggerAppoimentSubcription(){
    this.appointSubscription = this.dataService.getAppointments().subscribe(x => {
      this.appointments = x
      this.appointmentByService(this.service);
    });
  }

  /** Subscription get selected date from dataService layer **/
  triggerDateSubcription(){
    this.dateSubscription = this.dataService.getDate().subscribe(x => {
      this.date = x
    });
  }

  /** Subscription get appointments by a date  group by service  from dataService layer**/
  triggerServiceSubcription(){
    this.serviceSubscription = this.dataService.getService().subscribe(x => {
      this.service = x
      /**   call at oninit - get appoinments by selected service  **/
      this.appointmentByService(x);
    });
  }

  /** Fn to filter appointments by a service and table visibility **/
  appointmentByService(service: string){
    this.showTable =true;
    this.appointmentsByaService = this.appointments[service]
  }

  /** UPDATE complete appointments status as 1 calling API */
  completeAppointment(appointmentId:string, loginUid:string):void{
    this.appointmentService.updateComleteAppointment(appointmentId, loginUid)
      .subscribe(
        result => {
          /** SET appointment after complete one appointment by dataservice layer */
          this.dataService.setAppointments(this.date);
          /** call after complete one appointment - get appointments by a date  group by service(Refresh) */
          this.triggerAppoimentSubcription();
        }
      );
  }
}
