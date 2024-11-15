import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public listTitleschild: any[];
  public location: Location;
  public userName;
  constructor(location: Location,  private element: ElementRef, private router: Router,private authService: AuthService, private storageService: StorageService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.listTitleschild = ROUTES.filter(listTitle => listTitle.children).filter(listTitle2 => listTitle2).map(user => { user.children.forEach(x => this.listTitles.push(x))});
    this.userName = this.storageService.getUser().userName;
  }
  getTitle(){
    var title = this.location.prepareExternalUrl(this.location.path());

    if(title.charAt(0) === '#'){
        title = title.slice( 1 );
    }

    var firstindex = title.indexOf("/")

    if(firstindex !== 0){
      title = title.slice( 0,firstindex );
    }

   

    for(var item = 0; item < this.listTitles.length; item++){
      var pathTitle = this.listTitles[item].path
      var pathfirstindex = pathTitle.indexOf("/")
      if(pathfirstindex !== 0){
        pathTitle = pathTitle.slice( 0,pathfirstindex );
      }
      if(pathTitle === title){
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        // window.location.reload();
        this.router.navigate(['/login']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
