import { Routes } from '@angular/router';

import {
  HomeComponent,
  DetailPageComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'results', component: HomeComponent },
    { path: 'date-sheets', component: HomeComponent },
    { path: 'model-papers', component: HomeComponent },
    { path: 'past-papers', component: HomeComponent },
    { path: 'news', component: HomeComponent },
    { path: 'results/:classTitle/:examType/:year', component: DetailPageComponent},
    { path: 'date-sheets/:pageId', component: DetailPageComponent},
    { path: '**', redirectTo: '' }
];
