import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    AddResultComponent,
    AddBoardComponent,
    AddClassComponent,
    ResultsComponent,
    BoardsComponent,
    ClassesComponent
  ]
})

export class AdminLayoutModule {}
