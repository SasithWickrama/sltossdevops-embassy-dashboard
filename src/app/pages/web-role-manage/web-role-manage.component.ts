import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

import { AuthGuard } from 'src/app/helper/auth.guard';
import { Webrole } from 'src/app/interfaces/webrole/webrole';
import { WebroleService } from 'src/app/services/webrole/webrole.service';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-web-role-manage',
  templateUrl: './web-role-manage.component.html',
  styleUrls: ['./web-role-manage.component.scss']
})
export class WebRoleManageComponent implements OnInit {

  webRoles: Webrole[] = [];
  private isLoggedIn = false;
  dataSource =  new MatTableDataSource();
  initColumns: any[] =  [ 
                          {name: 'uid', displayName: 'Uid', hide:true },
                          {name: 'roleName', displayName: 'Role Name'}, 
                          {name: 'roleDescription', displayName: 'Role Description'}, 
                          {name: 'createDate', displayName: 'Create Date'}, 
                          {name: 'updateDate', displayName: 'Update Date'},
                          {name: 'button', displayName: ''}
                        ];                  
                    
  displayedColumns: any[] = this.initColumns.filter(cd => !cd.hide).map(col => col.name);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webroleService: WebroleService, private storageService: StorageService, private router: Router, private authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      const user = this.storageService.getUser();
      this.getWebRoles();
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

  /** get web roles from service */
  getWebRoles(): void {
    this.webroleService.getAllRole().subscribe(
      (data) => {
        if (data['result'] === 1) {
          this.webRoles = data['data'];
          this.dataSource =  new MatTableDataSource(this.webRoles);
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

  /** delete web role with confirmation with sweetalert */
  submitDeleteRole(uid: string, role: string): void {
    Swal.fire({
      title: 'Are you sure to delete the "'+ role +'" web role?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#11cdef',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
       this.deleteWebRole(uid);
      }
    });
  }

  /* call web role delete function from service level */
  deleteWebRole(uid: String){
    this.webroleService.deleteRole(uid).subscribe(
      response => {
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
        this.getWebRoles();
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
