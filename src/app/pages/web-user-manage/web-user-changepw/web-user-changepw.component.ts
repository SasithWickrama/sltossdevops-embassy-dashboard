import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';

import { Webuser } from 'src/app/interfaces/webuser/webuser';
import { WebuserService } from 'src/app/services/webuser/webuser.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-web-user-changepw',
  templateUrl: './web-user-changepw.component.html',
  styleUrls: ['./web-user-changepw.component.scss']
})
export class WebUserChangepwComponent implements OnInit {

  public webUser: Webuser;
  newPassword: string;
  confirmPassword: string;
  passwordError: string;
  private currentMobUserUid;
  private isLoggedIn = false;

  constructor(private router: Router, private storageService: StorageService, private webuserService: WebuserService, private route: ActivatedRoute, private authGuard:AuthGuard) { 

    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/user-management/web-users-manage']);
    }else{
      this.currentMobUserUid = this.router.getCurrentNavigation().extras.state;
    }

  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.getUser(this.currentMobUserUid);
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
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  /* form submit for password reset */
  onSubmit(userForm: NgForm): void {
    if (userForm.invalid || !this.validatePassword(this.newPassword) || this.newPassword !== this.confirmPassword) {
      userForm.form.markAllAsTouched();
      return;
    }else{
      const salt = bcrypt.genSaltSync(10);
      // this.webUser.passCode = bcrypt.hashSync(this.confirmPassword, salt);
      this.webUser.passCode = this.confirmPassword;
      this.changePassword(this.webUser.uid, this.webUser.passCode);
    }
  }

  /* call user create function from service level */
  changePassword(uid: string, passcode: String){
    this.webuserService.changeUserPw(uid, passcode).subscribe(
      response => {
        if (response.result === 1) {
          Swal.fire({
            title: 'Success',
            text: 'Password changed successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/user-management/web-users-manage']);
          });
        } else {
          this.passwordError = "Failed to change password";
        }
      },
      error => {
        this.passwordError = error.message;
        Swal.fire({
          title: 'Error',
          text: 'Failed to change password.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }

   /* password validation */
  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}
