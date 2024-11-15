import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

declare interface RouteInfo {
    path: string;
    params?:string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', params: '', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    // { path: '/user-details/:id', params: '', title: 'User Details',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/user-profile/', params: '', title: 'User Profile',  icon:'ni-circle-08 text-primary', class: '' },
    { path: '/appoint', params: '', title: 'Appointment Details',  icon:'ni-circle-08 text-primary', class: '' },
    { path: '/appoint-block', params: '', title: 'Block Appointment',  icon:'ni-circle-08 text-primary', class: '' },
    {
      path: '',
      title: 'User Management',
      icon: 'ni-laptop text-primary',
      class: '',
      children: [
        { path: '/user-management/web-users-manage', title: 'Web Users', icon: 'ni-single-02 text-primary', class: 'pl-4' },
        { path: '/user-management/mobile-users-manage', title: 'Mobile Users', icon: 'ni-single-02 text-primary', class: 'pl-4' },
      ]
    },
    {
      path: '',
      title: 'Role Management',
      icon: 'ni-laptop text-primary',
      class: '',
      children: [
        { path: '/role-management/web-roles-manage', title: 'Web Roles', icon: 'ni-single-02 text-primary', class: 'pl-4' },
      ]
    },
    {
      path: '',
      title: 'Task Management',
      icon: 'ni-laptop text-primary',
      class: '',
      children: [
        { path: '/task-management/web-tasks-manage', title: 'Web Tasks', icon: 'ni-single-02 text-primary', class: 'pl-4' },
      ]
    }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public isLoggedIn = false;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {

    /** check for user logged in or not */
    if (this.storageService.isLoggedIn()) {

      this.isLoggedIn = true; // local login status as true
      ROUTES[1]['params'] = this.storageService.getUser().userName; // assign login user's username to ROUTE params
      this.menuItems = ROUTES.filter(menuItem => menuItem); // asign ROUTES to menuItems list
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
      // console.log(this.menuItems)

    }else{

      this.router.navigate(['/login']); // return login page

    }
  }
}
