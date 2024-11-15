import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';

import { Appointment } from '../../../interfaces/appointment/appointment';
import { StorageService } from '../../../services/storage.service';
import { AppointmentService } from '../../../services/appointment/appointment.service';
import { DataService } from '../../../services/data.service';
import { appointmentConstants } from '../../../../constants/my-constants';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.scss']
})
export class DetailsContainerComponent implements OnInit {

  serviceSubscription: Subscription;
  appointaSubscription: Subscription;
  appointbSubscription: Subscription;
  appointcSubscription: Subscription;
  dateSubscription: Subscription;
  categorySubscription: Subscription;
  tabSubscription: Subscription;

  isLoggedIn = false;
  service: string;
  date: string;
  category: string;
  appointments:Appointment[];
  allAppointments:Appointment[];
  pendingAppointments:Appointment[];
  completeAppointments:Appointment[];
  public appointmentsByaService:Appointment[];
  public showTable = false;
  active = appointmentConstants.StartTab;
  dataSource =  new MatTableDataSource();
  initColumns: any[] =  [ 
                          {name: 'appoint_id', displayName: 'Appoint Id'}, 
                          {name: 'appoint_date', displayName: 'Appoint Date'},
                          {name: 'appoint_time', displayName: 'Appoint Time'},
                          {name: 'appoint_user', displayName: 'Appoint User'},
                          {name: 'service_type', displayName: 'Service Type', hide: false},
                          {name: 'appoint_stat', displayName: 'Appointment Status', hide: true},
                          {name: 'button', displayName: ''},
                        ];
  displayedColumns: any[] = this.initColumns.filter(cd => !cd.hide).map(col => col.name);

  constructor(private storageService: StorageService, private router: Router, private appointmentService: AppointmentService, private dataService: DataService) { 

    /**   call at contructor - get appointments by a date  group by service**/    
    this.triggerDateSubcription();
    this.triggerTabSubcription();
    this.triggerServiceSubcription();
    this.triggerAppoimentsSubcription();
    this.triggerCategorySubcription();


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
      console.log('login')
    }

  }

  ngOnDestroy() {
    // unsubscibe to ensure no memory leaks
    this.serviceSubscription.unsubscribe();
    this.dateSubscription.unsubscribe();
    this.tabSubscription.unsubscribe();
    this.categorySubscription.unsubscribe
  }
  

  // /** Subscription get all appointments by a date  group by service  from dataService layer**/
  // triggerAllAppoimentSubcription(){
  //   this.appointcSubscription = this.dataService.getAllAppointments().subscribe(x => {
  //     this.allAppointments = x
  //     if(appointmentConstants.StartTab == 1){
  //       this.appointments = this.allAppointments;
  //       this.appointmentByService(this.service);
  //     }
  //   });
  // }

  // /** Subscription get pending appointments by a date  group by service  from dataService layer**/
  // triggerPendingAppoimentSubcription(){
  //   this.appointbSubscription = this.dataService.getPendingAppointments().subscribe(x => {
  //     this.pendingAppointments = x;
  //     console.log("pending appoi")
  //     if(appointmentConstants.StartTab == 2){
  //       this.appointments = this.pendingAppointments;
  //       this.appointmentByService(this.service);
  //     }
  //     // console.log('loaded pen appoint')
  //   });
  // }

  // /** Subscription get complete appointments by a date  group by service  from dataService layer**/
  // triggerCompleteAppoimentSubcription(){
  //   this.appointaSubscription = this.dataService.getCompleteAppointments().subscribe(x => {
  //     this.completeAppointments = x
  //     if(appointmentConstants.StartTab == 3){
  //       this.appointments = this.completeAppointments;
  //       this.appointmentByService(this.service);
  //     }
  //   });
  // }

  /** Subscription get selected date from dataService layer **/
  triggerDateSubcription(){
    this.dateSubscription = this.dataService.getDate().subscribe(x => {
      this.date = x
    });
  }

  /** Subscription get selected category from dataService layer **/
  triggerCategorySubcription(){
    this.categorySubscription = this.dataService.getCategory().subscribe(x => {
      this.category = x
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

  /** Subscription get all, pending, complete appointments by a date  group by service  from dataService layer**/
  triggerAppoimentsSubcription(){
    /** all appointments **/
    this.appointcSubscription = this.dataService.getAllAppointments().subscribe(x => {
      this.allAppointments = x;
      if(this.active == 1){
        this.appointments = this.allAppointments;
        this.appointmentByService(this.service);
      }
    });
    /** pending appointments **/
    this.appointbSubscription = this.dataService.getPendingAppointments().subscribe(x => {
      this.pendingAppointments = x;
      if(this.active == 2){
        this.appointments = this.pendingAppointments;
        this.appointmentByService(this.service);
      }
    });
    /** complete appointments **/
    this.appointaSubscription = this.dataService.getCompleteAppointments().subscribe(x => {
      this.completeAppointments = x;
      if(this.active == 3){
        this.appointments = this.completeAppointments;
        this.appointmentByService(this.service);
      }
    });
  }

  /** Subscription get selected tab from dataService layer **/
  triggerTabSubcription(){
    this.tabSubscription = this.dataService.getActiveTabAppointment().subscribe(x => {
      this.active = x
      if(this.active == 1){

        this.appointments = this.allAppointments;
        this.appointmentByService(this.service);

      }else if(this.active ==  2){

        this.appointments = this.pendingAppointments;
        this.appointmentByService(this.service);

      }else if(this.active ==  3){

        this.appointments = this.completeAppointments;
        this.appointmentByService(this.service);

      }
    })
  }

  // /** Subscription get selected tab from dataService layer **/
  // triggerTabSubcriptionold(){
  //   console.log('triggerTabSubcriptions')
  //   this.tabSubscription = this.dataService.getActiveTabAppointment().subscribe(x => {
  //     this.active = x
  //     if(this.active == 1){
  //       console.log('All Tab Tab')
  //       this.appointments = this.allAppointments;
  //       this.appointmentByService(this.service);
  //       // console.log(this.appointments)
  //     }else if(this.active ==  2){
  //       console.log('pending Tab Tab')
  //       this.appointments = this.pendingAppointments;
  //       this.appointmentByService(this.service);
  //       console.log(this.appointments)
  //     }else if(this.active ==  3){
  //       console.log('complete Tab')
  //       this.appointments = this.completeAppointments;
  //       this.appointmentByService(this.service);
  //       // console.log(this.appointments)
  //     }
  //   })
  // }

  /** Fn to filter appointments by a service and table visibility **/
  appointmentByService(service: string){
    this.showTable =true;
    this.appointmentsByaService = this.appointments[service]
    this.dataSource =  new MatTableDataSource(this.appointmentsByaService);
  }

  /** UPDATE complete appointments status as 1 calling API */
  completeAppointment(appointmentId:string, loginUid:string):void{
    this.appointmentService.updateComleteAppointment(appointmentId['appoint_id'], loginUid)
      .subscribe(
        result => {
          this.dataService.setAllAppointments(this.date, this.category);
          this.dataService.setPendingAppointments(this.date, this.category);
          this.dataService.setCompleteAppointments(this.date, this.category);
          // this.triggerTabSubcription1
        }
      );
  }

  // /** UPDATE complete appointments status as 1 calling API */
  // completeAppointmentold(appointmentId:string, loginUid:string):void{
  //   this.appointmentService.updateComleteAppointment(appointmentId, loginUid)
  //     .subscribe(
  //       result => {
  //         console.log(this.date);
  //         console.log('compleye this.date');
  //         if(this.active == 1){
  //           /** SET all appointment after complete one appointment by dataservice layer */
  //           this.dataService.setAllAppointments(this.date);
  //           /** call after complete one appointment - get all appointments by a date  group by service(Refresh) */
  //           this.triggerAllAppoimentSubcription();
  //         }else if(this.active ==  2){ 
  //           /** SET pending appointment after complete one appointment by dataservice layer */
  //           this.dataService.setPendingAppointments(this.date);
  //           /** call after complete one appointment - get pending appointments by a date  group by service(Refresh) */
  //           this.triggerPendingAppoimentSubcription();
  //         }else if(this.active ==  3){ 
  //           /** SET completed appointment after complete one appointment by dataservice layer */
  //           this.dataService.setCompleteAppointments(this.date);
  //           /** call after complete one appointment - get completed appointments by a date  group by service(Refresh) */
  //           this.triggerCompleteAppoimentSubcription();
  //         }
  //         // window.location.reload()
  //       }
  //     );
  // }

}
