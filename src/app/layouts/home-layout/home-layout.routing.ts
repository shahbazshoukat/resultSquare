import { Routes } from '@angular/router';

import {
  HomeComponent,
  ResultPageComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result/:classTitle/:examType/:year', component: ResultPageComponent},
    { path: '**', redirectTo: '' }
];
