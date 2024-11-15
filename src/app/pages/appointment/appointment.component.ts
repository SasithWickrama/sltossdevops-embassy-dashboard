import { Component, OnInit, inject } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';

import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { appointmentConstants } from '../../../constants/my-constants';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  appointCountSubscription: Subscription;

  isLoggedIn =false;
  active = appointmentConstants.StartTab;
  allAppointCount = 0;
  pendingAppointCount = 0;
  completeAppointCount = 0;
  dropdownDefault = 'Select a Value';

  today = inject(NgbCalendar).getToday();
  public selectedDate: string;
  form: any = {
    model:null,
    category:null
  };
  
  constructor(private storageService: StorageService, private router: Router, private dataService: DataService, private authGuard:AuthGuard) { 
    
    /**   call at contructor - get appointments count for given date**/
    this.triggerAllAppoimentCountSubcription();
    this.triggerPendingAppoimentCountSubcription();
    this.triggerCompleteAppoimentCountSubcription();

  }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.loginUid = this.storageService.getUser().uid;
    }else{
      this.router.navigate(['/login']);
    }

    if(this.isLoggedIn){

      this.form.category = 'ALL';
      // this.getToday();
      // this.dataService.setActiveTabAppointment(this.active);

    }

  }

  ngAfterViewInit(): void {
    this.getToday();
    this.dataService.setActiveTabAppointment(this.active);
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

   /* SET date and appointments for current date on dataservice layer*/
   getToday(){
    this.form['model'] = this.today
    this.dataService.setDate(this.dateFormat(this.today))/** SET date to current date on dataService layer */
    this.dataService.setCategory(this.form.category);/** SET selected categorydate on dataService layer */
    this.dataService.setAllAppointments(this.dateFormat(this.today), this.form.category);/** SET All appointments by passing current date as param on dataService layer */
    this.dataService.setPendingAppointments(this.dateFormat(this.today), this.form.category);/** SET Pending appointments by passing current date as param on dataService layer */
    this.dataService.setCompleteAppointments(this.dateFormat(this.today), this.form.category);/** SET Complete appointments by passing current date as param on dataService layer */
  }

  /* SET date and appointments for selected date on dataservice layer*/
  selectDate() {

    const { model } = this.form; /**  get selected date - format NgbDateStruct (use dateFormat() to convert it YYYY-MM-DD String format)*/
    this.dataService.setDate(this.dateFormat(model))/** SET date to selected date on dataService layer */
    this.dataService.setCategory(this.form.category);/** SET selected categorydate on dataService layer */
    this.dataService.setAllAppointments(this.dateFormat(model), this.form.category);/** SET Pending appointments by passing current date as param on dataService layer */
    this.dataService.setPendingAppointments(this.dateFormat(model), this.form.category);/** SET Pending appointments by passing current date as param on dataService layer */
    this.dataService.setCompleteAppointments(this.dateFormat(model), this.form.category);/** SET Complete appointments by passing current date as param on dataService layer */

  }

  /* convert NgbDateStruct date to YYYY-MM-DD String format */
  dateFormat(model:NgbDateStruct) : string{

    var year = model.year.toString();
    var month = model.month.toString();
    var day = model.day.toString();
    
    if(model.month < 10){
      month =  "0" + model.month.toString()
    }
    if(model.day < 10){
      day =  "0" + model.day.toString()
    }

    this.selectedDate = year + "-" + month + "-" + day;

    return this.selectedDate;

  }

  tabChange(){
    this.dataService.setActiveTabAppointment(this.active);
  }

  /** Subscription get all appointments count by a date from dataService layer**/
  triggerAllAppoimentCountSubcription(){
    this.appointCountSubscription = this.dataService.getAllAppointmentsCount().subscribe(x => {
      this.allAppointCount = x
    });
  }

  /** Subscription get complete appointments count by a date  group by service  from dataService layer**/
  triggerPendingAppoimentCountSubcription(){
    this.appointCountSubscription = this.dataService.getPendingAppointmentsCount().subscribe(x => {
      this.pendingAppointCount = x
    });
  }

  /** Subscription get complete appointments count by a date  group by service  from dataService layer**/
  triggerCompleteAppoimentCountSubcription(){
    this.appointCountSubscription = this.dataService.getCompleteAppointmentsCount().subscribe(x => {
      this.completeAppointCount = x
    });
  }

}
