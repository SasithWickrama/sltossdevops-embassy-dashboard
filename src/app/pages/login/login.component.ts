import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  public errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      // this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {

    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        if(data['result'] == 1){
          this.storageService.saveUser(data.data);
          this.storageService.saveToken(data.token);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roleId;
          // this.reloadPage();
          this.router.navigate(['/dashboard']);
        }else{
          if(data.status == 0){
            this.errorMessage = data.name;
          }else{
            this.errorMessage = data.error['message'];
          }
          this.isLoginFailed = true;
        }
       
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  ngOnDestroy() {
  }

  reloadPage(): void {
    window.location.reload();
  }

}
