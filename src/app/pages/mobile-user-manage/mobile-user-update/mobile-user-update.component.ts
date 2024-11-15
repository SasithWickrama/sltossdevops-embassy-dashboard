import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Mobuser } from 'src/app/interfaces/mobuser/mobuser';
import { MobuserService } from 'src/app/services/mobuser/mobuser.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';


@Component({
  selector: 'app-mobile-user-update',
  templateUrl: './mobile-user-update.component.html',
  styleUrls: ['./mobile-user-update.component.scss']
})
export class MobileUserUpdateComponent implements OnInit {

  private isLoggedIn = false;
  isAddMode: boolean;
  private userId = '';
  private currentMobUserUid?;
  dateOfBirth: NgbDateStruct;
  minDate: NgbDateStruct;

  public mobUser: Mobuser = {
    age: "",
    createDate: null,
    dateOfBirth: "",
    emergencyContact: "",
    empAddress: "",
    empContact: "",
    firstName: "",
    fullName: "",
    gender: "",
    lastName: "",
    nic: "",
    passCode: "",
    passportNo: "",
    salary: "",
    slAddress: "",
    slContactName: "",
    slContactNo: "",
    uaeAddress: "",
    uaeContactName: "",
    uaeContactNo: "",
    uaeMobileNo: "",
    uid: null,
    updateDate: null
  }

  constructor(private storageService: StorageService, private router: Router, private mobuserService: MobuserService, private route: ActivatedRoute, private calendar: NgbCalendar, private authGuard:AuthGuard) {
    this.minDate = { year: 1950, month: 1, day: 1 };
    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/user-management/mobile-users-manage']);
    }else{
      this.currentMobUserUid = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.isAddMode = !this.currentMobUserUid;
      // if(this.currentMobUserUid)
      if (!this.isAddMode) {
        this.getUser(this.currentMobUserUid);
      }
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  /* convert date of string data type to NgbDateStruct data type */
  convertDate(stringDate: string):NgbDateStruct {

    const date = new Date(stringDate);
    const ngFormatDate =  {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };

    return ngFormatDate;

  }

  /* get user details by userID */
  getUser(userId: string): void {
    this.mobuserService.getUserByUid(userId).subscribe(
      user => {
        this.mobUser = user['data'];
        if (this.mobUser.dateOfBirth) {
          this.dateOfBirth = this.convertDate(this.mobUser.dateOfBirth)
        }
        this.sendDataToService();
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  sendDataToService() {
    this.mobuserService.setUserByUid(this.mobUser);
  }

  // validatePassword(password: string): boolean {
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  //   return passwordRegex.test(password);
  // }

  /* calender date selection on change event */
  onDateChange(date: NgbDateStruct) {
    this.dateOfBirth = date;
    this.mobUser.dateOfBirth = this.formatDate(this.dateOfBirth);
  }

  /* convert NgbDateStruct date to string date */
  formatDate(date: NgbDateStruct): string {
    return `${date.year}-${this.padNumber(date.month)}-${this.padNumber(date.day)}`;
  }

  /*   */
  padNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  /* form submit for both create and upadte */
  onSubmit(userForm: NgForm): void {
    
    if (userForm.valid) {
      if(this.dateOfBirth !== undefined){
        this.mobUser.dateOfBirth = this.formatDate(this.dateOfBirth);
      }
      // this.mobUser.status = this.mobUser.statusLabel === 'Enable' ? 1 : 0;
      if (this.isAddMode) {
        this.createMobUser(this.mobUser);
      } else {
        this.updateMobUser(this.mobUser);
      }
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Please consider about validations',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#11cdef'
      });
    }
   
  }

  /* call user create function from service level */
  createMobUser(user: Mobuser){
    this.mobuserService.createUser(user).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'User profile created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            // this.router.navigate(['/user-management/mobile-users-manage']);
            this.mobuserService.getMobUser();
          });
        }
      },
      error => {
        console.error('Error creating user', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the user profile.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

  /* call user update function from service level */
  updateMobUser(user: Mobuser){
    this.mobuserService.updateUser(user).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'User profile updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            // this.router.navigate(['/user-management/mobile-users-manage']);
            this.mobuserService.getMobUser();
          });
        }
      },
      error => {
        console.error('Error updating user', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the user profile.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }



}
