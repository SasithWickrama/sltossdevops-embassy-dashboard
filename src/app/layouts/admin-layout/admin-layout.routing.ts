import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserDetailsComponent } from '../../pages/user-details/user-details.component';
import { UserProfileUpdateComponent } from '../../pages/user-profile/user-profile-update/user-profile-update.component';
import { AppointmentComponent } from '../../pages/appointment/appointment.component';
import { BlAppointmentComponent } from '../../pages/bl-appointment/bl-appointment.component';
import { MobileUserManageComponent } from '../../pages/mobile-user-manage/mobile-user-manage.component';
import { WebUserManageComponent } from '../../pages/web-user-manage/web-user-manage.component';
import { MobileUserUpdateComponent } from '../../pages/mobile-user-manage/mobile-user-update/mobile-user-update.component';
import { MobileUserChangepwComponent } from '../../pages/mobile-user-manage/mobile-user-changepw/mobile-user-changepw.component';
import { WebUserChangepwComponent } from '../../pages/web-user-manage/web-user-changepw/web-user-changepw.component';
import { WebUserCreateUpdateComponent } from '../../pages/web-user-manage/web-user-create-update/web-user-create-update.component';
import { WebRoleManageComponent } from '../../pages/web-role-manage/web-role-manage.component';
import { WebTaskManageComponent } from '../../pages/web-task-manage/web-task-manage.component';
import { WebTaskCreateUpdateComponent } from '../../pages/web-task-manage/web-task-create-update/web-task-create-update.component';
import { WebTaskAssigntoRoleComponent } from '../../pages/web-task-manage/web-task-assignto-role/web-task-assignto-role.component';
import { WebRoleCreateUpdateComponent } from '../../pages/web-role-manage/web-role-create-update/web-role-create-update.component';
import { AuthGuard } from '../../helper/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', 
      component:DashboardComponent,
      loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    { path: 'user-profile/:username',   component: UserProfileComponent },
    { path: 'user-profile/update/:uid',   component: UserProfileUpdateComponent },
    { path: 'appoint', 
      component:AppointmentComponent,
      canActivate: [AuthGuard],
      data: { title: 'Appointment Details' },
      loadChildren: () => import('../../pages/appointment/appointment.module').then(m => m.AppointmentModule)
    },
    { path: 'appoint-block', 
      canActivate: [AuthGuard],
      data: { title: 'Block Appointment' },
      component:BlAppointmentComponent,
      loadChildren: () => import('../../pages/bl-appointment/bl-appointment.module').then(m => m.BlAppointmentModule)
  },
    {
      path: 'user-management',
      children: [
        { path: 'web-users-manage', component: WebUserManageComponent, canActivate: [AuthGuard], data: {  title: 'Web Users' },},
        { path: 'web-users-create', component: WebUserCreateUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Web Users' },},
        { path: 'web-users-update', component: WebUserCreateUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Web Users' },},
        { path: 'web-users-changepw', component: WebUserChangepwComponent, canActivate: [AuthGuard], data: {  title: 'Web Users' },},
        { path: 'mobile-users-manage', component: MobileUserManageComponent, canActivate: [AuthGuard], data: {  title: 'Mobile Users' }, },
        { path: 'mobile-users-update', component: MobileUserUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Mobile Users' },},
        { path: 'mobile-users-create', component: MobileUserUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Mobile Users' }, },
        { path: 'mobile-users-changepw', component: MobileUserChangepwComponent, canActivate: [AuthGuard], data: {  title: 'Mobile Users' }, },
      ]
    },
    {
      path: 'role-management',
      children: [
        { path: 'web-roles-manage', component: WebRoleManageComponent, canActivate: [AuthGuard], data: {  title: 'Web Roles' },},
        { path: 'web-roles-edit', component: WebRoleCreateUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Web Roles' },},
        { path: 'web-roles-create', component: WebRoleCreateUpdateComponent, canActivate: [AuthGuard], data: {  title: 'Web Roles' },},
      ]
    },
    {
      path: 'task-management',
      children: [
        { path: 'web-tasks-manage', component: WebTaskManageComponent, canActivate: [AuthGuard], data: { title: 'Web Tasks' },},
        { path: 'web-tasks-edit', component: WebTaskCreateUpdateComponent, canActivate: [AuthGuard], data: { title: 'Web Tasks' },},
        { path: 'web-tasks-create', component: WebTaskCreateUpdateComponent, canActivate: [AuthGuard], data: { title: 'Web Tasks' },},
        { path: 'web-tasks-assign', 
          component:WebTaskAssigntoRoleComponent,
          canActivate: [AuthGuard],
          // data: { roles: ['ADMIN'], title: 'Web Tasks' },
          data: {  title: 'Web Tasks' },
          loadChildren: () => import('../../pages/web-task-manage/web-task-assignto-role/web-task-assignto-role.module').then(m => m.WebTaskAssigntoRoleModule)
        },
      ]
    },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'user-details/:id',   component: UserDetailsComponent },
];
