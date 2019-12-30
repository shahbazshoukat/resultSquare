import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { HomeLayoutRoutes } from './home-layout.routing';
import { HomeComponent } from '../../pages/home/home.component';
import { SelectBoardComponent } from '../../pages/select-board/select-board.component';
import { SelectYearComponent } from '../../pages/select-year/select-year.component';
import { SelectExamComponent } from '../../pages/select-exam/select-exam.component';
import { EnterRollNoComponent } from '../../pages/enter-rollno/enter-rollno.component';
import { ResultPageComponent } from '../../pages/result-page/result-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import { SafePipe } from '../../pipes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    HomeComponent,
    SelectBoardComponent,
    SelectYearComponent,
    SelectExamComponent,
    EnterRollNoComponent,
    ResultPageComponent,
    SafePipe
  ]
})

export class HomeLayoutModule {}
