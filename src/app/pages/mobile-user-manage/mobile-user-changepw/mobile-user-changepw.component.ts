import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcryptjs';

import { Mobuser } from 'src/app/interfaces/mobuser/mobuser';
import { MobuserService } from 'src/app/services/mobuser/mobuser.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-mobile-user-changepw',
  templateUrl: './mobile-user-changepw.component.html',
  styleUrls: ['./mobile-user-changepw.component.scss']
})
export class MobileUserChangepwComponent implements OnInit {

  public mobUser: Mobuser;
  newPassword: string;
  confirmPassword: string;
  passwordError: string;
  private currentMobUserUid;
  private isLoggedIn = false;

  constructor(private router: Router, private storageService: StorageService, private mobuserService: MobuserService, private route: ActivatedRoute, private authGuard:AuthGuard) { 

    if(this.router.getCurrentNavigation().previousNavigation == null){
      this.router.navigate(['/user-management/mobile-users-manage']);
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

  // getUser(userId: string): void {
  //   this.mobuserService.getUserById(this.userId).subscribe(
  //     user => {
  //       this.mobUser = user['data'];
  //       this.sendDataToService();
  //     },
  //     error => {
  //       console.error('Error fetching user data', error);
  //     }
  //   );
  // }

  /* get user details by userID */
  getUser(userId: string): void {
    this.mobuserService.getUserByUid(userId).subscribe(
      user => {
        this.mobUser = user['data'];
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
      // this.mobUser.passCode = bcrypt.hashSync(this.confirmPassword, salt);
      // this.changePassword(this.mobUser.uid, this.mobUser.passCode);
      this.mobUser.passCode = this.confirmPassword;
      this.changePassword(this.mobUser.passportNo, this.confirmPassword); //bcrpt by backend
    }
  }

  /* call user create function from service level */
  changePassword(uid: string, passcode: String){
    this.mobuserService.changeUserPw(uid, passcode).subscribe(
      response => {
        if (response.result === 1) {
          Swal.fire({
            title: 'Success',
            text: 'Password changed successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#11cdef'
          }).then(() => {
            this.router.navigate(['/user-management/mobile-users-manage']);
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

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

}
