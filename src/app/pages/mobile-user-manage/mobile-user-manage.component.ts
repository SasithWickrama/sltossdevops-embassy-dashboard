import { Component, OnInit, ViewChild } from '@angular/core';
import { Mobuser } from 'src/app/interfaces/mobuser/mobuser';
import { MobuserService } from 'src/app/services/mobuser/mobuser.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthGuard } from 'src/app/helper/auth.guard';

@Component({
  selector: 'app-mobile-user-manage',
  templateUrl: './mobile-user-manage.component.html',
  styleUrls: ['./mobile-user-manage.component.scss']
})
export class MobileUserManageComponent implements OnInit {

  mobileUsers: Mobuser[] = [];
  searchPassportNo: string = '';
  private isLoggedIn = false;
  dataSource =  new MatTableDataSource();
  initColumns: any[] =  [ 
                          {name: 'firstName', displayName: 'First Name'}, 
                          {name: 'lastName', displayName: 'Last Name'},
                          {name: 'nic', displayName: 'NIC'},
                          {name: 'passportNo', displayName: 'Passport No' },
                          {name: 'emergencyContact', displayName: 'Emergency Contact'},
                          {name: 'uid', displayName: 'Uid', hide: true },
                          {name: 'button', displayName: ''},
                        ];
  displayedColumns: any[] = this.initColumns.filter(cd => !cd.hide).map(col => col.name);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // private userRole: string;
  // public canCreateUser = false;
  // public canEditUser = false;
  // public canDeleteUser = false;

  constructor(private mobuserService: MobuserService, private storageService: StorageService, private router: Router, private authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      const user = this.storageService.getUser();
      // this.userRole = user.roleName;
      // this.canCreateUser = this.userRole === 'admin' || this.userRole === 'admin create';
      // this.canEditUser = this.userRole === 'admin' || this.userRole === 'admin edit';
      // this.canDeleteUser = this.userRole === 'admin' || this.userRole === 'admin delete';
      this.getMobileUsers();
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

  /** get mobile users from service */
  getMobileUsers(): void {
    this.mobuserService.getAllUsers().subscribe(
      (data) => {
        if (data['result'] === 1) {
          this.mobileUsers = data['data'];
          this.dataSource =  new MatTableDataSource(this.mobileUsers);
          this.dataSource.paginator = this.paginator;

        } else {
          console.error('Error fetching mobile users', data['message']);
        }
      },
      (error) => {
        console.error('Error fetching mobile users', error);
      }
    );
  }

  /** delete user with confirmation with sweetalert */
  submitDeleteMobUser(uid: string, passportno: string): void {
    Swal.fire({
      title: 'Are you sure to delete the user of Passport No '+ passportno +' ?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#11cdef',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
       this.deleteMobUser(uid);
      }
    });
  }

  /* call user delete function from sservice level */
  deleteMobUser(uid: String){
    this.mobuserService.deleteUser(uid).subscribe(
      response => {
        // console.log('User deleted successfully:', response);
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
        this.getMobileUsers();
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

  // filteredMobUsers(): Mobuser[] {
  //   if (!this.searchPassportNo) {
  //     return this.mobileUsers;
  //   }
  //   return this.mobileUsers.filter(user => user.passportNo.toLowerCase().includes(this.searchPassportNo.toLowerCase()));
  // }

}
