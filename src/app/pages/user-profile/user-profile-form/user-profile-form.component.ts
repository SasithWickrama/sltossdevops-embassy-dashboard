import { Component, OnInit,  Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

import { Webuser } from '../../../interfaces/webuser/webuser';
import { Webrole } from '../../../interfaces/webrole/webrole';
import { WebroleService } from '../../../services/webrole/webrole.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  @Input() webUserChild:Webuser;
  @Input() disableInput:Boolean;

  private isLoggedIn = false;
  public webRole: Webrole[];

  constructor(private webRoleService: WebroleService) { }

  ngOnInit(): void {
    this.getWebRoleDetails();
  }

   /** web role details **/
   getWebRoleDetails(): void {
    this.webRoleService.getAllRole()
      .subscribe(
        role => {
          this.webRole = role['data'];
          this.sendDataToService();
        }
      );
  }

  /* send fetch web role data to service*/
  sendDataToService() {
    this.webRoleService.setAllRole(this.webRole);
  }

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      
    }

  }
}
