import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { AddResultComponent } from '../../pages/admin/add-result/add-result.component';
import { AddBoardComponent } from '../../pages/admin/add-board/add-board.component';
import { AddClassComponent } from '../../pages/admin/add-class/add-class.component';
import { ResultsComponent } from '../../pages/admin/results/results.component';
import { BoardsComponent } from '../../pages/admin/boards/boards.component';
import { ClassesComponent } from '../../pages/admin/classes/classes.component';
import { CommentsComponent } from '../../pages/admin/comments/comments.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'add-result/:boardKey', component: AddResultComponent, canActivate: [AuthGuard] },
    { path: 'add-board', component: AddBoardComponent, canActivate: [AuthGuard] },
    { path: 'add-class', component: AddClassComponent, canActivate: [AuthGuard] },
    { path: 'results/:boardKey', component: ResultsComponent, canActivate: [AuthGuard] },
    { path: 'boards', component: BoardsComponent, canActivate: [AuthGuard] },
    { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard] },
    { path: 'comments/board/:boardId', component: CommentsComponent, canActivate: [AuthGuard]},
    { path: 'comments/result/:resultId', component: CommentsComponent, canActivate: [AuthGuard]}
];
