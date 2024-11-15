import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { AppointmentRoutes } from './appointment.routing';
import { AppointmentComponent } from './appointment.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TotalContainerComponent } from './total-container/total-container.component';
import { ServiceCardComponent } from './service-card/service-card.component';
import { DetailsContainerComponent } from './details-container/details-container.component';

@NgModule({
  declarations: [
    AppointmentComponent,
    TotalContainerComponent,
    ServiceCardComponent,
    DetailsContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppointmentRoutes),
    NgbModule,
    NgbNavModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class AppointmentModule { }
