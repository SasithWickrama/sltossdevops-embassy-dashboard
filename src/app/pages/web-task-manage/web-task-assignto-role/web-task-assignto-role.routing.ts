import { Routes } from '@angular/router';

import { WebTaskAssigntoTabComponent } from './web-task-assignto-tab/web-task-assignto-tab.component';


export const WebTaskAssigntoRoleRoutes: Routes = [
    { path: '',   component: WebTaskAssigntoTabComponent, outlet:'tabBody'},
];
