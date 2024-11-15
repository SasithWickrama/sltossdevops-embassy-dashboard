import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

import { AuthGuard } from 'src/app/helper/auth.guard';
import { Webtask } from 'src/app/interfaces/webtask/webtask';
import { WebtaskService } from 'src/app/services/webtask/webtask.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-web-task-manage',
  templateUrl: './web-task-manage.component.html',
  styleUrls: ['./web-task-manage.component.scss']
})
export class WebTaskManageComponent implements OnInit {

  webTasks: Webtask[] = [];
  private isLoggedIn = false;
  dataSource =  new MatTableDataSource();
  initColumns: any[] =  [ 
                          {name: 'task_id', displayName: 'Uid', hide:true },
                          {name: 'task_name', displayName: 'Task Name'}, 
                          {name: 'createdDate', displayName: 'Create Date'}, 
                          {name: 'updateDate', displayName: 'Update Date'},
                          {name: 'button', displayName: ''}
                        ];
  displayedColumns: any[] = this.initColumns.filter(cd => !cd.hide).map(col => col.name);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private webtaskService: WebtaskService, private storageService: StorageService, private router: Router, private authGuard:AuthGuard) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      const user = this.storageService.getUser();
      this.getWebTasks();
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

  /** get web tasks from service */
  getWebTasks(): void {
    this.webtaskService.getAllTasks().subscribe(
      (data) => {
        if (data['result'] === 1) {
          this.webTasks = data['data'];
          this.dataSource =  new MatTableDataSource(this.webTasks);
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

  /** delete web task with confirmation with sweetalert */
  submitDeleteTask(uid: string, task: string): void {
    Swal.fire({
      title: 'Are you sure to delete the "'+ task +'" web task?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#11cdef',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
       this.deleteWebTasks(uid);
      }
    });
  }

  /* call web task delete function from service level */
  deleteWebTasks(uid: String){
    this.webtaskService.deleteTask(uid).subscribe(
      response => {
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#11cdef'
        });
        this.getWebTasks();
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
