import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Webuser } from 'src/app/interfaces/webuser/webuser';
import { Webrole } from 'src/app/interfaces/webrole/webrole';
import { WebuserService } from 'src/app/services/webuser/webuser.service';
import { WebroleService } from 'src/app/services/webrole/webrole.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-web-user-create-update',
  templateUrl: './web-user-create-update.component.html',
  styleUrls: ['./web-user-create-update.component.scss']
})
export class WebUserCreateUpdateComponent implements OnInit {

  private isLoggedIn = false;
  isAddMode: boolean;
  private currentWebUserUid?;
  public webRole: Webrole;

  public webUser: Webuser = {
    uid         :'',
    userName    :'',
    firstName   :'',
    lastName    :'',
    nic         :'',
    roleId      :'',
    roleName    : '',
    passCode    :'',
    createDate  :null,
    updateDate  :null
  }

  constructor(private storageService: StorageService, private router: Router, private webuserService: WebuserService, private route: ActivatedRoute, private calendar: NgbCalendar, private webroleService: WebroleService, private authGuard:AuthGuard) {
    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/user-management/web-users-manage']);
    }else{
      this.currentWebUserUid = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.isAddMode = !this.currentWebUserUid;
      if (!this.isAddMode) {
        this.getUser(this.currentWebUserUid);
      }
      this.getWebRoleDetails();
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  /* get user details by userID */
  getUser(userId: string): void {
    this.webuserService.getUserByUid(userId).subscribe(
      user => {
        this.webUser = user['data'];
        this.sendWebuserDataToService();
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  /* send fetch webuser data to service*/
  sendWebuserDataToService() {
    this.webuserService.setWebuser(this.webUser);
  }

  /** web role details **/
  getWebRoleDetails(): void {
    this.webroleService.getAllRole()
      .subscribe(
        role => {
          this.webRole = role['data'];
          this.sendRoleDataToService();
        }
      );
  }

  /* send fetch web role data to service*/
  sendRoleDataToService() {
    this.webroleService.setAllRole(this.webRole);
  }

  /* form submit for both create and upadte */
  onSubmit(userForm: NgForm): void {
    
    if (userForm.valid) {
      if (this.isAddMode) {
        this.createMobUser(this.webUser);
      } else {
        this.updateMobUser(this.webUser);
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
  createMobUser(user: Webuser){
    this.webuserService.createUser(user).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'User profile created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/user-management/web-users-manage']);
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
  updateMobUser(user: Webuser){
    this.webuserService.updateUser(user).subscribe(
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
            this.webuserService.getWebuser();
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
