import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { SelectBoardComponent } from '../../pages/select-board/select-board.component';
import {SelectYearComponent} from '../../pages/select-year/select-year.component';
import {SelectExamComponent} from '../../pages/select-exam/select-exam.component';
import { EnterRollNoComponent } from '../../pages/enter-rollno/enter-rollno.component';
import { SelectSubClassComponent } from '../../pages/select-sub-class/select-sub-class.component';
import {PageNotFoundComponent} from '../../pages/page-not-found/page-not-found.component';

export const HomeLayoutRoutes: Routes = [
    { path: '',         component: HomeComponent },
    // { path: 'result/:classTitle',         component: SelectBoardComponent },
    // { path: 'result/:classTitle/:boardKey', component: SelectYearComponent },
    // { path: 'result/:classTitle/:boardKey/:year', component: SelectExamComponent},
    { path: 'result/:classTitle/:boardKey/:year/:examType', component: EnterRollNoComponent},
    // { path: 'test/:testTitle', component: EnterRollNoComponent},
    // { path: 'uni/:classTitle/:uniKey', component: EnterRollNoComponent},
    // { path: 'class/:classTitle', component: SelectSubClassComponent },
    { path: '**', redirectTo: '' }
];
