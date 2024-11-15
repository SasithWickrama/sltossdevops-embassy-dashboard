import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormsModule, Validators, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

import { StorageService } from 'src/app/services/storage.service';
import { Webchecktask } from 'src/app/interfaces/webtask/webchecktask';
import { WebtaskService } from 'src/app/services/webtask/webtask.service';
import { WebTaskManageDataService } from '../../../../services/dataServices/web-task-manage/web-task-manage-data.service';

@Component({
  selector: 'app-web-task-assignto-tab',
  templateUrl: './web-task-assignto-tab.component.html',
  styleUrls: ['./web-task-assignto-tab.component.scss']
})
export class WebTaskAssigntoTabComponent implements OnInit {

  private isLoggedIn = false;
  public activeTab: Number;
  public isRoleSelected = false;
  public roleSelected = '';
  public roleSelectedName = '';
  public allComplete: boolean = false;
  public isCheckboxDisabled = false;
  // filteredItems: Webchecktask[] = [];
  checkTask: Webchecktask = {
    id: '',
    name: 'ALL',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  // RemoveTask: Webchecktask = {
  //   id: '',
  //   name: 'ALL',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [],
  // };

  constructor(private storageService: StorageService, private router: Router, private webtaskService: WebtaskService, private webTaskManageDataService:WebTaskManageDataService) { 

    /**   call at contructor - get appointments count for given date**/
    this.triggergetIsSelectedRoleBooleanSubcription();
    this.triggergetSelectedRoleBooleanSubcription();
    this.triggergetCheckTaskListSubcription();
    // this.triggergetRemoveTaskListSubcription();
    // this.triggergetRemoveTaskListSubcription();
    this.triggergetActiveTabSubcription();

  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** set allcomplete flag when checked event trigger */
  checkWebTaskUpdateAllComplete() {
    this.allComplete = this.checkTask.subtasks != null && this.checkTask.subtasks.every(t => t.completed);
  }

  /** set indeterminate value as ture or false */
  checkWebTaskSomeComplete(): boolean {
    if (this.checkTask.subtasks == null) {
      return false;
    }
    return this.checkTask.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  /** set all subtasks as checked or not */
  checkWebTaskSetAll(completed: boolean) {
    this.allComplete = completed;
    if (this.checkTask.subtasks == null) {
      return;
    }
    this.checkTask.subtasks.forEach(t => (t.completed = completed));
  }

  /** Subscription get isRoleSelected dataService layer**/
  triggergetIsSelectedRoleBooleanSubcription(){
    this.webTaskManageDataService.getIsSelectedRoleBoolean().subscribe({
      next: (isSelected: boolean) => {
        this.isRoleSelected = isSelected;
      },
      error: (error) => {
        console.error('Error fetching role selection status', error);
      }
    });
  }

   /** Subscription get RoleSelected dataService layer**/
   triggergetSelectedRoleBooleanSubcription(){
    this.webTaskManageDataService.getSelectedRole().subscribe({
      next: (Selected: string) => {
        this.roleSelected = Selected['uid'];
        this.roleSelectedName = Selected['role'];
        if(this.roleSelectedName == 'ADMIN'){
          this.isCheckboxDisabled = true;
        }else{
          this.isCheckboxDisabled = false;
        }
      },
      error: (error) => {
        console.error('Error fetching role selection status', error);
      }
    });
  }

  /** Subscription get final check list dataService layer**/
  triggergetCheckTaskListSubcription(){
    this.webTaskManageDataService.getCheckTaskList().subscribe({
      next: (checkList: Webchecktask) => {
        this.checkTask = checkList;
      },
      error: (error) => {
        console.error('Error fetching role selection status', error);
      }
    });
  }

  // /** Subscription get final check list dataService layer**/
  // triggergetRemoveTaskListSubcription(){
  //   this.webTaskManageDataService.getRemoveTaskList().subscribe({
  //     next: (removeList: Webchecktask) => {
  //       this.RemoveTask = removeList;
  //       console.log(this.RemoveTask)
  //       console.log("this.RemoveTask")
  //     },
  //     error: (error) => {
  //       console.error('Error fetching role selection status', error);
  //     }
  //   });
  // }

  /** Subscription get RoleSelected dataService layer**/
  triggergetActiveTabSubcription(){
    this.webTaskManageDataService.getActiveTab().subscribe({
      next: (tab: Number) => {
        this.activeTab = tab;
      },
      error: (error) => {
        console.error('Error fetching role selection status', error);
      }
    });
  }

  /* assign task to role form submmission  */
  onSubmitAssignTask(taskForm: NgForm): void {
    /* filering to get only checked task list*/
    const checkedtasksubmit:Webchecktask[] = this.checkTask.subtasks.filter(t => t.completed);
    /** create a array only with task id from  checkedtasksubmit */
    const chacktasksubmitonlytaskidlist = Array.from(checkedtasksubmit, (task: Webchecktask) => ({
      task_id : task.id,
    }));
    if(this.activeTab == 1){ // TAB 1 add tasks
      /** call function to add the checked task for given role */
      this.assigntaskToRole(this.roleSelected, chacktasksubmitonlytaskidlist);
    }else if (this.activeTab == 2){ // TAB 2 remove tasks
      /** call function to REMOVE the checked task for given role */
      this.removetaskFromRole(this.roleSelected, chacktasksubmitonlytaskidlist);
    }
  }

  /** function to assign tasks to given role */
  assigntaskToRole(role_id, tasklist) : void {
    this.webtaskService.assignTaskToRole(role_id, tasklist).subscribe(
      data => {
        if(data['result'] === 1){
          this.webTaskManageDataService.setIsSubmitedAssignRemove(true);
          if(data['message'] == 'ALREADY_EXITS'){  // when tasks are alredy exits for the role
            Swal.fire({
              title: 'Success',
              text: 'Already assigns tasks to the role.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#11cdef'
            })
          }else{ // succefully add the tasks for role
            Swal.fire({
              title: 'Success',
              text: 'Tasks assign to Role Successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#11cdef'
            })
            // .then(() => {
            //   this.router.navigate(['/task-management/web-tasks-manage']);
            // });
          }
        }else{ //api result with error
          Swal.fire({
            title: 'Warning',
            text: data['message'],
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef',
          });
        }
      },
      error => { // calling api error handle
        console.error('Error task assign to role', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error assiging tasks to a role',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

  /** function to remove tasks from given role */
  removetaskFromRole(role_id, tasklist) : void {
    this.webtaskService.removeTaskFromRole(role_id, tasklist).subscribe(
      data => {
        if(data['result'] === 1){
          this.webTaskManageDataService.setIsSubmitedAssignRemove(true);
          if(data['message'] == 'ALREADY_DELETED'){  // when tasks are alredy exits for the role
            Swal.fire({
              title: 'Success',
              text: 'Already deleted tasks from the role.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#11cdef'
            })
          }else{ // succefully add the tasks for role
            Swal.fire({
              title: 'Success',
              text: 'Tasks deleted from the Role Successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#11cdef'
            })
            // .then(() => {
            //   this.router.navigate(['/task-management/web-tasks-manage']);
            // });
          }
        }else{ //api result with error
          Swal.fire({
            title: 'Warning',
            text: data['message'],
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef',
          });
        }
      },
      error => { // calling api error handle
        console.error('Error task assign to role', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error assiging tasks to a role',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

}
