import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';

import { WebuserService } from '../../../services/webuser/webuser.service';
import { StorageService } from '../../../services/storage.service';
import { Webuser } from '../../../interfaces/webuser/webuser';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {

  public webUser: Webuser;
  private isLoggedIn = false;
  newPassword: string;
  confirmPassword: string;
  passwordError: string;

  constructor(private router: Router, private storageService: StorageService, private webuserService: WebuserService) { }

  ngOnInit(): void {

     /* check whether user login is success or not */
     if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true; //locally log status set as true

      this.webuserService.currentwebUserData.subscribe(data => {
        this.webUser = data
      });

    }else{
      this.router.navigate(['/login']); // redirect to login page
    }
  }

  /* form submit for password reset */
  onSubmit(userForm: NgForm): void {
    console.log('submit')
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
            this.router.navigate(['/user-profile/'+ this.webUser.userName]);
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
