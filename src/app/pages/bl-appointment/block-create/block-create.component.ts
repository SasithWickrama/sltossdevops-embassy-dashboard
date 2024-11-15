import { Component, OnInit, inject } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbNavChangeEvent, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { StorageService } from '../../../services/storage.service';
import { DataService } from '../../../services/data.service';
import { BlAppointmentService } from '../../../services/bl-appointment/bl-appointment.service';

@Component({
  selector: 'app-block-create',
  templateUrl: './block-create.component.html',
  styleUrls: ['./block-create.component.scss']
})
export class BlockCreateComponent implements OnInit {

  isLoggedIn =false;
  loginUid;
  dropdownDefault = 'Select a Value';
  form: any = {
    date:null,
    time:null,
    category:null
  };
  minDate = inject(NgbCalendar).getToday();

  constructor(private storageService: StorageService, private router: Router, private blAppointmentService:BlAppointmentService, private dataService:DataService) { }

  ngOnInit(): void {
    /* check whether if user succesfully login or not */
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.loginUid = this.storageService.getUser().uid;
      // this.getAppointmenttimeSlot('','');
      // this.getAppointmenttimeSlot('2024-06-13','CONSULAR');
    }else{
      this.router.navigate(['/login']);
    }

    /* if user succesfully login */
    if(this.isLoggedIn){

      this.form.category = this.dropdownDefault;

    }
  }

  /* convert NgbDateStruct date to HH:SS String format */
  timeFormat(time:NgbTimeStruct) : string{

    var hour = time.hour.toString();
    var minute = time.minute.toString();
    var second = time.second.toString();

    if(time.hour < 10){
      hour =  "0" + time.hour.toString()
    }

    if(time.minute < 10){
      minute =  "0" + time.minute.toString()
    }

    var formattedTime = hour + ":" + minute;

    return formattedTime;

  }

  /* convert NgbDateStruct date to YYYY-MM-DD String format */
  dateFormat(date:NgbDateStruct) : string{

    var year = date.year.toString();
    var month = date.month.toString();
    var day = date.day.toString();
    
    if(date.month < 10){
      month =  "0" + date.month.toString()
    }
    if(date.day < 10){
      day =  "0" + date.day.toString()
    }

    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;

  }

  /* Form submit - category, date and time slot -call in html page as button click event */
  submitform() {

    this.blockAppointmenttimeSlot(this.dateFormat(this.form.date), this.timeFormat(this.form.time), this.form.category, '1', this.loginUid);

  }

  /**BLOCK  appointment time slot calling API */
  blockAppointmenttimeSlot(appointBlDate: string, appointBlTime: string, serviceCatagory: string, appointBlStat: string, createdUser:string):void{
    this.blAppointmentService.blockAppointmentsTimeSlot(appointBlDate, appointBlTime, serviceCatagory, appointBlStat, createdUser)
      .subscribe(
        result => {
          this.dataService.setBlockAppointmentsTimeSlot('','');//Set block appointment when page load if login is successful.
        }
      );
  }

}
