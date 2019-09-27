import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from '../../pages/home/home.component';
import { SelectBoardComponent } from '../../pages/select-board/select-board.component';
import {SelectYearComponent} from '../../pages/select-year/select-year.component';
import {SelectExamComponent} from '../../pages/select-exam/select-exam.component';
import { EnterRollNoComponent } from '../../pages/enter-rollno/enter-rollno.component';
import { ResultPageComponent } from '../../pages/result-page/result-page.component';

export const HomeLayoutRoutes: Routes = [
    { path: '',         component: HomeComponent },
    { path: 'selectboard',         component: SelectBoardComponent },
    { path: 'selectyear', component: SelectYearComponent },
    { path: 'selectexam', component: SelectExamComponent},
    { path: 'enterrollno', component: EnterRollNoComponent},
    { path: 'result-page', component: ResultPageComponent}
];
