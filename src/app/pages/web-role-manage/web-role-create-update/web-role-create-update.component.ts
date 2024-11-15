import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Webrole } from 'src/app/interfaces/webrole/webrole';
import { WebroleService } from 'src/app/services/webrole/webrole.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';


@Component({
  selector: 'app-web-role-create-update',
  templateUrl: './web-role-create-update.component.html',
  styleUrls: ['./web-role-create-update.component.scss']
})
export class WebRoleCreateUpdateComponent implements OnInit {

  private isLoggedIn = false;
  isAddMode: boolean;
  private currentWebRoleUid?;

  public webRole: Webrole = {

    uid: '',
    roleName: '',
    roleDescription: '',
    createDate: null,
    updateDate: null

  }

  constructor(private storageService: StorageService, private router: Router, private webroleService: WebroleService, private route: ActivatedRoute, private calendar: NgbCalendar, private authGuard:AuthGuard) { 
    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/task-management/web-task-manage']);
    }else{
      this.currentWebRoleUid = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.isAddMode = !this.currentWebRoleUid;
      if (!this.isAddMode) {
        this.getwebRole(this.currentWebRoleUid);
      }
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

   /* get role details by roleid */
   getwebRole(uid: string): void {
    this.webroleService.getRoleByUid(uid).subscribe(
      user => {
        this.webRole = user['data'];
        this.sendWebroleDataToService();
      },
      error => {
        console.error('Error fetching task data', error);
      }
    );
  }

  /* send fetch webrole data to service*/
  sendWebroleDataToService() {
    this.webroleService.setWebrole(this.webRole);
  }

  /* form submit for both create and upadte */
  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      if (this.isAddMode) {
        this.createWebRole(this.webRole);
      } else {
        this.updateWebRole(this.webRole);
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

  /* call role create function from service level */
  createWebRole(role: Webrole){
    this.webroleService.createRole(role).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'Web Role created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/role-management/web-roles-manage']);
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: response['message'],
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/role-management/web-roles-manage']);
          });
        }
      },
      error => {
        console.error('Error creating role', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the web role.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

  /* call role update function from service level */
  updateWebRole(role: Webrole){
    this.webroleService.updateRole(role).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'Web Role updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            // this.router.navigate(['/task-management/mobile-users-manage']);
            this.webroleService.getWebrole();
          });
        }
      },
      error => {
        console.error('Error updating task', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error updating the web task.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

}
