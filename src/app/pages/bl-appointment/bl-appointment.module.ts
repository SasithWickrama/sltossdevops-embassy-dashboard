import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BlAppointmentRoutes } from './bl-appointment.routing';
import { BlAppointmentComponent } from './bl-appointment.component';
import { BlockCreateComponent } from './block-create/block-create.component';
import { BlockListComponent } from './block-list/block-list.component';



@NgModule({
  declarations: [
    BlAppointmentComponent,
    BlockCreateComponent,
    BlockListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BlAppointmentRoutes),
    NgbModule,
    NgbNavModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class BlAppointmentModule { }
