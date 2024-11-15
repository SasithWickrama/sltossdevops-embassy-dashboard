import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';

import { StorageService } from '../../../services/storage.service';
import { DataService } from '../../../services/data.service';
import { BlAppointmentService } from '../../../services/bl-appointment/bl-appointment.service';

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {

  appointmenttimeSlotSubcription: Subscription;

  isLoggedIn = false;
  loginUid = null;
  showTable = true;
  blockedTimeSlotList = [];

  displayedColumns: string[] = [ 'appoint_bl_date',  'appoint_bl_time','createDate', 'service_catagory', 'created_user', 'updateDate', 'updated_user'];
  dataSource;

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private storageService: StorageService,  private router: Router, private blAppointmentService:BlAppointmentService, private dataService:DataService, private activatedRoute: ActivatedRoute) { 
    
    /**  call at contructor - get appointment time slot list **/
    this.triggerGetAppointmenttimeSlotSubcription();

  }

  ngOnInit(): void {
    /* check whether if user succesfully login or not */
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.loginUid = this.storageService.getUser().uid;
    }else{
      this.router.navigate(['/login']);
    }

    /* if user succesfully login */
    if(this.isLoggedIn){

    }
    
  }

  /** mat angular table filtering */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Subscription get appointment time slot list from dataService layer **/
  triggerGetAppointmenttimeSlotSubcription(){
    this.appointmenttimeSlotSubcription = this.dataService.getBlockAppointmentsTimeSlot().subscribe(x => {
      this.blockedTimeSlotList = x;
      /** Set data to dataSource which is used to load data in block details table  */
      this.dataSource =  new MatTableDataSource(x);
      /** Sort datatable */
      this.empTbSort.disableClear = true;
      this.dataSource.sort = this.empTbSort;
      this.dataSource.paginator = this.paginator;
    })
  }

  /** button click trigger in html page **/
  unblockTimeslotClick(uid: string){
    //call unblock appointment time slot 
    this.unblockAppointmenttimeSlot(uid, this.loginUid)
  }

  /**UNBLOCK  appointment time slot calling API */
  unblockAppointmenttimeSlot(uid: string, updatedUser:string):void{
    this.blAppointmentService.unblockAppointmentsTimeSlot( uid, updatedUser)
      .subscribe(
        result => {
          this.dataService.setBlockAppointmentsTimeSlot('','')
        }
      );
  }

}
