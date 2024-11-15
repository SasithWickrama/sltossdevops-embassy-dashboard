import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { UserDetailsComponent } from '../../pages/user-details/user-details.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileFormComponent } from '../../pages/user-profile/user-profile-form/user-profile-form.component';
import { UserProfileUpdateComponent } from '../../pages/user-profile/user-profile-update/user-profile-update.component';
import { NgbModule,NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentComponent } from '../../pages/appointment/appointment.component';
import { WebUserManageComponent } from '../../pages/web-user-manage/web-user-manage.component';
import { MobileUserManageComponent } from '../../pages/mobile-user-manage/mobile-user-manage.component';
import { MobileUserUpdateComponent } from '../../pages/mobile-user-manage/mobile-user-update/mobile-user-update.component';
import { MobileUserChangepwComponent } from '../../pages/mobile-user-manage/mobile-user-changepw/mobile-user-changepw.component';
import { WebUserChangepwComponent } from '../../pages/web-user-manage/web-user-changepw/web-user-changepw.component';
import { WebUserCreateUpdateComponent } from '../../pages/web-user-manage/web-user-create-update/web-user-create-update.component';
import { WebRoleManageComponent } from '../../pages/web-role-manage/web-role-manage.component';
import { WebTaskManageComponent } from '../../pages/web-task-manage/web-task-manage.component';
import { WebTaskCreateUpdateComponent } from '../../pages/web-task-manage/web-task-create-update/web-task-create-update.component';
import { WebTaskAssigntoRoleComponent } from '../../pages/web-task-manage/web-task-assignto-role/web-task-assignto-role.component';
import { WebRoleCreateUpdateComponent } from '../../pages/web-role-manage/web-role-create-update/web-role-create-update.component';


import { MatPaginatorModule } from '@angular/material/paginator';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgbNavModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    UserDetailsComponent,
    UserProfileFormComponent,
    UserProfileUpdateComponent,
    WebUserManageComponent,
    MobileUserManageComponent,
    MobileUserUpdateComponent,
    MobileUserChangepwComponent,
    WebUserChangepwComponent,
    WebUserCreateUpdateComponent,
    WebRoleManageComponent,
    WebTaskManageComponent,
    WebTaskCreateUpdateComponent,
    WebRoleCreateUpdateComponent
  ]
})

export class AdminLayoutModule {}
