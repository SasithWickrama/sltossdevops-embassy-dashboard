import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-total-container',
  templateUrl: './total-container.component.html',
  styleUrls: ['./total-container.component.scss']
})
export class TotalContainerComponent implements OnInit {

  dateSubscription: Subscription;
  totalSubscription: Subscription;

  isLoggedIn = false;
  public date:string;
  public total:Number;

  constructor(private dataService:DataService, private storageService:StorageService, private router:Router) { 
    /**   call at contructor - get selected date**/
    this.triggerDateSubcription();
    /**   call at contructor - get total appointment count**/
    this.triggerTotalSubcription();

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

  /** Subscription get selected date from dataService layer**/
  triggerDateSubcription(){
    this.dateSubscription = this.dataService.getDate().subscribe(x => {
      this.date = x
    });
  }

   /** Subscription get total appointment count   from dataService layer**/
   triggerTotalSubcription(){
    this.totalSubscription = this.dataService.getAppointmentsCount().subscribe(x => {
      this.total = x
    });
  }



}
