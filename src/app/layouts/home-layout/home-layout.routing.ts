import { Routes } from '@angular/router';

import {
  HomeComponent,
  EnterRollNoComponent,
  BoardsListComponent,
  ResultsListComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '',         component: HomeComponent },
    { path: 'result/:classTitle/:boardKey/:year/:examType', component: EnterRollNoComponent},
    { path: 'boards/:province', component: BoardsListComponent },
    { path: 'boards/class/:class', component: BoardsListComponent },
    { path: 'results/:board', component: ResultsListComponent },
    { path: 'results/:class/:board', component: ResultsListComponent },
    { path: '**', redirectTo: '' }
];
