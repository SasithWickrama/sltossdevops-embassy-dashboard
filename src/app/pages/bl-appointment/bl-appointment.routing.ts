import { Routes } from '@angular/router';

import { BlockCreateComponent } from './block-create/block-create.component';
import { BlockListComponent } from './block-list/block-list.component';


export const BlAppointmentRoutes: Routes = [
    { path: '',   component: BlockCreateComponent, outlet:'createCard'},
    { path: '',   component: BlockListComponent, outlet:'listCard'},
];
