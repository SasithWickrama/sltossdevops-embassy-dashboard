import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbNavChangeEvent, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { BlAppointmentService } from '../../services/bl-appointment/bl-appointment.service';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-bl-appointment',
  templateUrl: './bl-appointment.component.html',
  styleUrls: ['./bl-appointment.component.scss']
})
export class BlAppointmentComponent implements OnInit {

  isLoggedIn =false;
  loginUid;

  constructor(private storageService: StorageService, private router: Router, private dataService: DataService, private authGuard:AuthGuard ) {

    this.dataService.setBlockAppointmentsTimeSlot('','');//Set block appointment from dataservice layer

  }

  ngOnInit(): void {
    /* check whether if user succesfully login or not */
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.loginUid = this.storageService.getUser().uid;
      
    }else{
      this.router.navigate(['/login']);
    }

    /* if user succesfully login*/
    if(this.isLoggedIn){

    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  

  

  

}
