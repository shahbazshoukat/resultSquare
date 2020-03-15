import { Routes } from '@angular/router';

import {
  HomeComponent,
  EnterRollNoComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '',         component: HomeComponent },
    { path: 'result/:classTitle/:boardKey/:year/:examType', component: EnterRollNoComponent},
    { path: '**', redirectTo: '' }
];
