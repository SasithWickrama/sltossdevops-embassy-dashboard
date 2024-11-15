import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Webchecktask } from 'src/app/interfaces/webtask/webchecktask';

@Injectable({
  providedIn: 'root'
})
export class WebTaskManageDataService {

  private isSelectedRole = new Subject<Boolean>();
  private roleSelected = new Subject<String>();
  private checkTaskList = new Subject<Webchecktask>();
  private removeTaskList = new Subject<Webchecktask>();
  private activeTab = new Subject<Number>();
  private isSubmitted = new Subject<Boolean>();

  constructor() { }

  /** SET active tab  in web-task-manage data layer*/
  setActiveTab(value:Number) {
    this.activeTab.next(value);
  }

  /** GET active tab in web-task-manage data layer */
  getActiveTab(): Observable<Number> {
    return this.activeTab.asObservable();
  }

  /** SET isSelectedValue in web-task-manage data layer*/
  setIsSelectedRoleBoolean(value:Boolean) {
    this.isSelectedRole.next(value);
  }

  /** GET isSelectedValue in web-task-manage data layer */
  getIsSelectedRoleBoolean(): Observable<Boolean> {
    return this.isSelectedRole.asObservable();
  }

  /** SET selected role from dropdown in web-task-manage data layer*/
  setSelectedRole(value:String) {
    this.roleSelected.next(value);
  }

  /** GET selected role from dropdown in web-task-manage data layer */
  getSelectedRole(): Observable<String> {
    return this.roleSelected.asObservable();
  }

  /** SET check list which is got from slected role id and marked alredy asigned taks in web-task-manage data layer*/
  setCheckTaskList(value:Webchecktask) {
    this.checkTaskList.next(value);
  }

  /** GET check list which is got from slected role id and marked alredy asigned taks in web-task-manage data layer*/
  getCheckTaskList(): Observable<Webchecktask> {
    return this.checkTaskList.asObservable();
  }

  /** SET selected role from dropdown in web-task-manage data layer*/
  setIsSubmitedAssignRemove(value:Boolean) {
    this.isSubmitted.next(value);
  }

  /** GET selected role from dropdown in web-task-manage data layer */
  getIsSubmitedAssignRemove(): Observable<Boolean> {
    return this.isSubmitted.asObservable();
  }


  // /** SET remove task list which is got from slected role id and  alredy asigned taks in web-task-manage data layer*/
  // setRemoveTaskList(value:Webchecktask) {
  //   this.removeTaskList.next(value);
  // }

  // /** GET remove task list which is got from slected role id and alredy asigned taks in web-task-manage data layer*/
  // getRemoveTaskList(): Observable<Webchecktask> {
  //   return this.removeTaskList.asObservable();
  // }

}
