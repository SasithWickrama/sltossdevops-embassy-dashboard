import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { DetailsContainerComponent } from '../dashboard/details-container/details-container.component';
import { TotalContainerComponent } from '../dashboard/total-container/total-container.component';
import { ServiceCardComponent } from '../dashboard/service-card/service-card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DetailsContainerComponent,
    ServiceCardComponent,
    TotalContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    NgbModule,
    FormsModule,
  ]
})
export class DashboardModule { }
