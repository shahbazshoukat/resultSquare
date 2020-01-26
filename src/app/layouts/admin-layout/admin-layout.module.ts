import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { AddResultComponent } from '../../pages/admin/add-result/add-result.component';
import { AddBoardComponent } from '../../pages/admin/add-board/add-board.component';
import { AddClassComponent } from '../../pages/admin/add-class/add-class.component';
import { ResultsComponent } from '../../pages/admin/results/results.component';
import { BoardsComponent } from '../../pages/admin/boards/boards.component';
import { ClassesComponent } from '../../pages/admin/classes/classes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ToastrModule } from 'ngx-toastr';
import { AlertModule, AlertService } from 'ngx-alerts';


import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    AlertModule.forRoot({maxMessages: 5, timeout: 3000, position: 'right'})
  ],
  declarations: [
    DashboardComponent,
    AddResultComponent,
    AddBoardComponent,
    AddClassComponent,
    ResultsComponent,
    BoardsComponent,
    ClassesComponent
  ],
  providers: [
    AlertService
  ]
})

export class AdminLayoutModule {}
