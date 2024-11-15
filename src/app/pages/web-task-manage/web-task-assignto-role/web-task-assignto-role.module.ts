import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WebTaskAssigntoRoleRoutes } from './web-task-assignto-role.routing';
import { WebTaskAssigntoRoleComponent } from './web-task-assignto-role.component';
import { WebTaskAssigntoTabComponent } from './web-task-assignto-tab/web-task-assignto-tab.component';

@NgModule({
  declarations: [
    WebTaskAssigntoRoleComponent,
    WebTaskAssigntoTabComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(WebTaskAssigntoRoleRoutes),
    NgbModule, 
    NgbNavModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class WebTaskAssigntoRoleModule { }
