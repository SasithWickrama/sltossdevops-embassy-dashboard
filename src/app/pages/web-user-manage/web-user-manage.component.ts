import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

import { AuthGuard } from 'src/app/helper/auth.guard';
import { Webuser } from 'src/app/interfaces/webuser/webuser';
import { WebuserService } from 'src/app/services/webuser/webuser.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-web-user-manage',
  templateUrl: './web-user-manage.component.html',
  styleUrls: ['./web-user-manage.component.scss']
})
export class WebUserManageComponent implements OnInit {

  webUsers: Webuser[] = [];
  // searchPassportNo: string = '';
  private isLoggedIn = false;
  dataSource =  new MatTableDataSource();
  initColumns: any[] =  [ 
                          {name: 'uid', displayName: 'Uid', hide:true },
                          {name: 'userName', displayName: 'User Name'}, 
                          {name: 'firstName', displayName: 'First Name'}, 
                          {name: 'lastName', displayName: 'Last Name'},
                          {name: 'nic', displayName: 'NIC'},
                          {name: 'roleName', displayName: 'Role' },
                          {name: 'status', displayName: 'Status', hide:true},
                          {name: 'button', displayName: ''},
                        ];
  displayedColumns: any[] = this.initColumns.filter(cd => !cd.hide).map(col => col.name);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webuserService: WebuserService, private storageService: StorageService, private router: Router, private authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      const user = this.storageService.getUser();
      this.getWebUsers();
    } else {
      this.router.navigate(['/login']);
    }
  }

  /** enable tasks only athorize users */
  taskAccess(task: string){
    return this.authGuard.canTaskEnable(task);
  }

  /** mat angular table filtering */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** get web users from service */
  getWebUsers(): void {
    this.webuserService.getAllUsers().subscribe(
      (data) => {
        if (data['result'] === 1) {
          this.webUsers = data['data'];
          this.dataSource =  new MatTableDataSource(this.webUsers);
          this.dataSource.paginator = this.paginator;
        } else {
          console.error('Error fetching web users', data['message']);
        }
      },
      (error) => {
        console.error('Error fetching web users', error);
      }
    );
  }

  /** delete web user with confirmation with sweetalert */
  submitDeleteWebUser(uid: string, username: string): void {
    Swal.fire({
      title: 'Are you sure to delete the  '+ username +' User ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#11cdef',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
       this.deleteWebUser(uid);
      }
    });
  }

  /* call web user delete function from sservice level */
  deleteWebUser(uid: String){
    this.webuserService.deleteUser(uid).subscribe(
      response => {
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
        this.getWebUsers();
      },
      error => {
        console.error('Error deleting user:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an error deleting the user.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
      }
    );
  }
}
