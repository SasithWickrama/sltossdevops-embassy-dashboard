import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Webuser } from '../../interfaces/webuser/webuser';
import { StorageService } from '../../services/storage.service';
import { WebuserService } from '../../services/webuser/webuser.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public webUser: Webuser;
  private isLoggedIn = false;
  private username = '';

  constructor(private route: ActivatedRoute, private router: Router, private storageService: StorageService, private webUserService: WebuserService) { }

  ngOnInit() {

    /* check whether user login is success or not */
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true; //locally log status set as true
      this.username = this.route.snapshot.paramMap.get('username')!; // get parameter from url
      this.getWebUserDetails(this.username); // call function to get mobile user details
    }else{
      this.router.navigate(['/login']); // redirect to login page
    }

  }

  /** web user details by username **/
  getWebUserDetails(username:string): void {
    this.webUserService.getUser(username)
      .subscribe(
        user => {
          this.webUser = user['data'];
          this.sendDataToService();
        }
      );
  }

  /* send fetch data to service*/
  sendDataToService() {
    this.webUserService.setWebuser(this.webUser);
  }

}
