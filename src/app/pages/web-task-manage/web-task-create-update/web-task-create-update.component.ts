import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Webtask } from 'src/app/interfaces/webtask/webtask';
import { WebtaskService } from 'src/app/services/webtask/webtask.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-web-task-create-update',
  templateUrl: './web-task-create-update.component.html',
  styleUrls: ['./web-task-create-update.component.scss']
})
export class WebTaskCreateUpdateComponent implements OnInit {

  private isLoggedIn = false;
  isAddMode: boolean;
  private currentWebTaskUid?;

  public webTask: Webtask = {

    task_id: '',
    task_name: '',
    createDate: null

  }

  constructor(private storageService: StorageService, private router: Router, private WebtaskService: WebtaskService, private route: ActivatedRoute, private calendar: NgbCalendar, private authGuard:AuthGuard) {
    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/task-management/web-task-manage']);
    }else{
      this.currentWebTaskUid = this.router.getCurrentNavigation().extras.state;
    }
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.isAddMode = !this.currentWebTaskUid;
      if (!this.isAddMode) {
        this.getwebTask(this.currentWebTaskUid);
      }
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  /* get user details by userID */
  getwebTask(taskId: string): void {
    this.WebtaskService.getTaskByUid(taskId).subscribe(
      user => {
        this.webTask = user['data'];
        this.sendWebtaskDataToService();
      },
      error => {
        console.error('Error fetching task data', error);
      }
    );
  }

  /* send fetch webuser data to service*/
  sendWebtaskDataToService() {
    this.WebtaskService.setWebtask(this.webTask);
  }

  /* form submit for both create and upadte */
  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      if (this.isAddMode) {
        this.createWebTask(this.webTask);
      } else {
        this.updateWebTask(this.webTask);
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
  createWebTask(task: Webtask){
    this.WebtaskService.createTask(task).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'Web Task created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/task-management/web-tasks-manage']);
          });
        }
      },
      error => {
        console.error('Error creating task', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error creating the web task.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

  /* call user update function from service level */
  updateWebTask(task: Webtask){
    this.WebtaskService.updateTask(task).subscribe(
      response => {
        if(response['result'] == 1){
          Swal.fire({
            title: 'Success',
            text: 'Web Task updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            // this.router.navigate(['/task-management/mobile-users-manage']);
            this.WebtaskService.getWebtask();
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
