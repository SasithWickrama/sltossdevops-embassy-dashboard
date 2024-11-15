import { Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { Appointment } from '../../interfaces/appointment/appointment';
import { AppointmentService } from '../../services/appointment/appointment.service';
import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  today = inject(NgbCalendar).getToday();
  isLoggedIn = false;
  appointmentsAll: Appointment[] = [];
  public loginUid:String;
  public selectedDate: string;

  form: any = {
    model:null
  };

  constructor(private storageService: StorageService, private router: Router, private appointmentService: AppointmentService, private dataService: DataService) {}

  ngOnInit() {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.loginUid = this.storageService.getUser().uid;
    }else{
      this.router.navigate(['/login']);
    }

    if(this.isLoggedIn){

      this.getToday();
     
    }

  }

  /* SET date and appointments for current date on dataservice layer*/
  getToday(){
    this.form['model'] = this.today
    this.dataService.setDate(this.dateFormat(this.today))/** SET date to current date on dataService layer */
    this.dataService.setAppointments(this.dateFormat(this.today));/** SET appointments by passing current date as param on dataService layer */
  }

  /* SET date and appointments for selected date on dataservice layer*/
  selectDate() {

    const { model } = this.form; /**  get selected date - format NgbDateStruct (use dateFormat() to convert it YYYY-MM-DD String format)*/
    this.dataService.setDate(this.dateFormat(model))/** SET date to selected date on dataService layer */
    this.dataService.setAppointments(this.dateFormat(model));/** SET appointments by passing selected date as param on dataService layer */

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

  /** call API get all appointments from the service file */
  getAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(
        appointments => this.appointmentsAll = appointments['data']
      );
  }

}


