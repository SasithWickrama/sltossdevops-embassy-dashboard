import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DetailsContainerComponent } from './details-container/details-container.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { TotalContainerComponent } from './total-container/total-container.component';


export const DashboardRoutes: Routes = [
    // { path: '',   component: DashboardComponent },
    { path: '',   component: DetailsContainerComponent},
    { path: '',   component: ServiceCardComponent, outlet:'serviceCard'},
    { path: '',   component: TotalContainerComponent, outlet:'totalCon'},
];
