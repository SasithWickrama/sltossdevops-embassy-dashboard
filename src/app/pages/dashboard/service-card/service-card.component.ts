import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { Appointment } from '../../../interfaces/appointment/appointment';
import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  appointSubscription: Subscription;

  isLoggedIn = false;
  activeService:string;
  appointmentsCount:number
  public appointmentsGrbyService:Appointment[];
  public appointmentsByaServiceToday

  constructor(private dataService:DataService, private storageService:StorageService, private router:Router) {

    /**   call at contructor - get appointments by a date  group by service**/
    this.triggerAppoimentSubcription();

   }

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

  
  /** Subscription get appointments by a date  group by service  from dataService layer**/
  triggerAppoimentSubcription(){
    this.appointSubscription = this.dataService.getAppointments().subscribe(x => {
      this.appointmentsGrbyService = x
    });
  }

  /** Fn appointments filter by a selected service (bind to service card click event) */
  getAppointmentsDetailsByService(service:string): void{
    this.activeService = service;
    this.dataService.setService(service);/** SET selected servie on dataService layer */
  }

}
