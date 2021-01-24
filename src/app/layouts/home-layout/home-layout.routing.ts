import { Routes } from '@angular/router';

import {
  HomeComponent,
  ResultPageComponent,
  BoardsListComponent,
  BoardResultsComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':boardKey', component: BoardResultsComponent },
    { path: 'boards/:province', component: BoardsListComponent },
    { path: 'result/:classTitle/:boardKey/:year/:examType', component: ResultPageComponent},
    { path: '**', redirectTo: '' }
];
