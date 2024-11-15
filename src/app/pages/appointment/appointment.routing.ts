import { Routes } from '@angular/router';

import { AppointmentComponent } from './appointment.component';
import { DetailsContainerComponent } from './details-container/details-container.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { TotalContainerComponent } from './total-container/total-container.component';


export const AppointmentRoutes: Routes = [
    // { path: '',   component: AppointmentComponent },
    { path: '',   component: DetailsContainerComponent, outlet:'detailCard'},
    { path: '',   component: ServiceCardComponent, outlet:'serviceCard'},
    { path: '',   component: TotalContainerComponent, outlet:'totalCon'},
];
