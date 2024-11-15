import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Mobuser } from '../../interfaces/mobuser/mobuser';
import { MobuserService } from '../../services/mobuser/mobuser.service';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public mobUser: Mobuser;
  private isLoggedIn = false;
  private passportId = '';

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private mobUserService: MobuserService, private storageService: StorageService) { }

  ngOnInit(): void {

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.passportId = this.location.getState()['passportId'];
      this.passportId = this.route.snapshot.paramMap.get('id')!;
    }else{
      this.router.navigate(['/login']);
    }

    if(this.isLoggedIn){
      /** call function mobile user details by passport number **/
      this.getMobUserDetails(this.passportId);
      
    }

  }

  /** mobile user details by passport number **/
  getMobUserDetails(passportNo:string): void {
    this.mobUserService.getUsers(passportNo)
      .subscribe(
        // user => this.mobUser = user
        user => {
          this.mobUser = user['data'];
        }
      );
  }

}
