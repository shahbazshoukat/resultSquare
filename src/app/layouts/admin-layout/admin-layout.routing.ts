import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { AddResultComponent } from '../../pages/admin/add-result/add-result.component';
import { AddBoardComponent } from '../../pages/admin/add-board/add-board.component';
import { AddClassComponent } from '../../pages/admin/add-class/add-class.component';
import { ResultsComponent } from '../../pages/admin/results/results.component';
import { BoardsComponent } from '../../pages/admin/boards/boards.component';
import { ClassesComponent } from '../../pages/admin/classes/classes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'add-result',   component: AddResultComponent },
    { path: 'add-board',   component: AddBoardComponent },
    { path: 'add-class',   component: AddClassComponent },
    { path: 'results',         component: ResultsComponent },
    { path: 'boards',         component: BoardsComponent },
    { path: 'classes',         component: ClassesComponent }
];
