import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormControl, FormsModule, Validators, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';

import { Webrole } from 'src/app/interfaces/webrole/webrole';
import { Webtask } from 'src/app/interfaces/webtask/webtask';
import { Webchecktask } from 'src/app/interfaces/webtask/webchecktask';
import { WebroleService } from 'src/app/services/webrole/webrole.service';
import { WebtaskService } from 'src/app/services/webtask/webtask.service';
import { StorageService } from 'src/app/services/storage.service';
import { webTaskConstants } from '../../../../constants/my-constants';
import { WebTaskManageDataService } from '../../../services/dataServices/web-task-manage/web-task-manage-data.service';
import { AuthGuard } from 'src/app/helper/auth.guard';



@Component({
  selector: 'app-web-task-assignto-role',
  templateUrl: './web-task-assignto-role.component.html',
  styleUrls: ['./web-task-assignto-role.component.scss']
})
export class WebTaskAssigntoRoleComponent implements OnInit {

  private isLoggedIn = false;
  public webRole: Webrole;
  public webTasks: Webtask;
  public webCheckTask: Webchecktask;
  public roleSelected = '';
  public allComplete: boolean = false;
  private checkSubTaskList: Webchecktask[] = [];
  private removeCheckSubTaskList;
  role = new FormControl('', [Validators.required]);
  filteredItems: Webchecktask[] = [];
  public isRoleSelected = false;
  active = webTaskConstants.StartTab;

  checkTask: Webchecktask = {
    id: '',
    name: 'ALL',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  removeTask: Webchecktask = {
    id: '',
    name: 'ALL',
    completed: false,
    color: 'primary',
    subtasks: [],
  };

  constructor(private storageService: StorageService, private webroleService:WebroleService, private router: Router, private webtaskService: WebtaskService, private webTaskManageDataService:WebTaskManageDataService, private _formBuilder: FormBuilder, private authGuard:AuthGuard) { 
    this.triggerGetIsSubmitedAssignRemoveSubcription();
  }
  
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      /** set start tab (2-Add)active tab */
      this.webTaskManageDataService.setActiveTab(this.active);
      this.getWebRoleDetails();
      // this.getWebTasks();
    } else {
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  /** show error message on html page **/
  getErrorMessage() {
    if (this.role.hasError('required')) {
      return 'You must enter a value';
    }

    return this.role.hasError('email') ? 'Not a valid email' : '';
  }

  /** Subscription get RoleSelected dataService layer**/
  triggerGetIsSubmitedAssignRemoveSubcription(){
    this.webTaskManageDataService.getIsSubmitedAssignRemove().subscribe({
      next: (isSubmitted: Boolean) => {
        if(isSubmitted){
          this.getTaskFromRole(this.roleSelected['uid']);
          this.webTaskManageDataService.setIsSubmitedAssignRemove(false);
        }else{
        }
      },
      error: (error) => {
        console.error('Error fetching role selection status', error);
      }
    });
  }

  /** get web role details for dropdown**/
  getWebRoleDetails(): void {
    this.webroleService.getAllRole()
      .subscribe(
        role => {
          this.webRole = role['data'];
        }
      );
  }

  /** get web tasks from service and create checkSubTaskList depends on responce */
  getWebTasks(alreadyExitstaskId: string[]): void {
    this.webtaskService.getAllTasks().subscribe(
      (data) => {
        if (data['result'] === 1) {
          // this.webTasks = data['data'];
          /* create subtasks list using webtasks list */
          this.checkSubTaskList = Array.from(data['data'], (task: Webtask) => ({
            id: task.task_id,
            name: task.task_name,
            completed: false,
            color: 'primary',
          }));
          /* add newly created subtasks list to checkTask variable */
          this.checkTask.subtasks = this.checkSubTaskList;
          /* filter tasks which are aready exits */
          this.filteredItems = this.checkSubTaskList?.filter(item => alreadyExitstaskId.includes(item.id)); 
          /** add to a variable 'removeCheckSubTaskList' fitering tasks which are aready exits  */
          this.removeCheckSubTaskList = JSON.parse(JSON.stringify(this.filteredItems));
          /* update the subtaks list in  removeTask with task already exits for selected role_id*/
          this.removeTask.subtasks = this.removeCheckSubTaskList; 
          /** set filtred tsks's completed attribute as true */
          this.filteredItems.forEach(t => (t.completed = true));
          /* update the subtaks list in  checkTask with the tasks which are set as true for already available*/
          this.checkTask.subtasks = this.checkSubTaskList; 
          /** set add task list or remove task list depend on active tab */
          this.setTaskListDependOnActiveTab(this.active);
          // /** set completed check list which is got from slected role id and marked alredy asigned taks */
          // this.webTaskManageDataService.setCheckTaskList(this.checkTask);
          // /** set remove list with alredy asigned taks for selected role*/
          // this.webTaskManageDataService.setRemoveTaskList(this.removeTask);
        } else {
          console.error('Error fetching web tasks', data['message']);
        }
      },
      (error) => {
        console.error('Error fetching web tasks', error);
      }
    );
  }

  /** function to get all tasks for given role */
  getTaskFromRole(role_id: string) : void {
    this.webtaskService.getTaskFromRole(role_id).subscribe(
      data => {
        if(data['result'] === 1){
          const roleTaskList  =  data['data'];
          const alreadytaskIds = roleTaskList.map(task => task.task_id);
          this.getWebTasks(alreadytaskIds);
        }else{

        }
      },
      error => {
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
   



  /* Role selection submission form*/
  onSubmit(userForm: NgForm): void {
    /** set selected role in data layer */
    this.webTaskManageDataService.setSelectedRole(this.roleSelected);
    /* call the function to get tasks alreay assign for rule */
    this.getTaskFromRole(this.roleSelected['uid']);
    /** set value to enable view of  task list submit part  */
    this.isRoleSelected = true;
    /** set active tab when tab is changed */
    this.webTaskManageDataService.setActiveTab(this.active);
    /** set isRoleSelected value in data layer */
    this.webTaskManageDataService.setIsSelectedRoleBoolean(this.isRoleSelected);
  }

  tabChange(){
    /** set active tab when tab is changed */
    this.webTaskManageDataService.setActiveTab(this.active);
    /** set add task list or remove task list depend on active tab */
    this.setTaskListDependOnActiveTab(this.active)
  }

  setTaskListDependOnActiveTab(activeTab: Number){
    if(activeTab == 1){ // active tab 1 means add tasks tab 
      /** set completed check list which is got from slected role id and marked alredy asigned taks */
      this.webTaskManageDataService.setCheckTaskList(this.checkTask);
    }else if(activeTab == 2) { // active tab 2 means remove tasks tab
      /** set remove list with alredy asigned taks for selected role*/
      this.webTaskManageDataService.setCheckTaskList(this.removeTask);
    } else{

    }
  }

  
}
