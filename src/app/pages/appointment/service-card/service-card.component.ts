import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { Appointment } from '../../../interfaces/appointment/appointment';
import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage.service';
import { appointmentConstants } from '../../../../constants/my-constants';


@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  appointSubscription: Subscription;
  activeTabSubscription: Subscription;

  isLoggedIn = false;
  activeService:string;
  appointmentsCount:number;
  activeTab = appointmentConstants.StartTab;
  public appointmentsGrbyService:Appointment[];
  public appointmentsGrbyService1:[][] = [];
  public appointmentsGrbyService_2:Appointment[];
  public completeAppointmentsGrbyService:Appointment[];
  public appointmentsByaServiceToday


  constructor(private dataService:DataService, private storageService:StorageService, private router:Router) {
    
    /**   call at contructor - get appointments by a date  group by service**/
    this.triggerAllAppoimentSubcription();
    this.triggerPendingAppoimentSubcription();
    this.triggerCompleteAppoimentSubcription();
    this.triggerActivetabSubcription();

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
      this.triggerActivetabSubcription();
    }
  }

  /** Subscription get all appointments by a date  group by service  from dataService layer**/
  triggerAllAppoimentSubcription(){
    this.appointSubscription = this.dataService.getAllAppointments().subscribe(x => {
      this.appointmentsGrbyService = x
      this.appointmentsGrbyService1[1]=x;

    });

  }

  /** Subscription get all appointments by a date  group by service  from dataService layer**/
  triggerPendingAppoimentSubcription(){
    this.appointSubscription = this.dataService.getPendingAppointments().subscribe(x => {
      this.appointmentsGrbyService1[2] = x

    });
  }

  /** Subscription get all appointments by a date  group by service  from dataService layer**/
  triggerCompleteAppoimentSubcription(){
    this.appointSubscription = this.dataService.getCompleteAppointments().subscribe(x => {
      this.appointmentsGrbyService1[3] = x
    });
  }

  /** Subscription get active tab  from dataService layer**/
  triggerActivetabSubcription(){
    this.activeTabSubscription = this.dataService.getActiveTabAppointment().subscribe(x => {
      this.activeTab = x
    });
  }

  /** Fn appointments filter by a selected service (bind to service card click event) */
  getAppointmentsDetailsByService(service:string): void{
    this.activeService = service;
    this.dataService.setService(service);/** SET selected servie on dataService layer */
  }

}
