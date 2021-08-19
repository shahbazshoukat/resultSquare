import { Routes } from '@angular/router';

import {
  ResultsComponent,
  ResultDetailPageComponent,
  DateSheetsComponent,
  ModelPapersComponent,
  DateSheetDetailComponent,
  ModelPaperDetailComponent,
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '', component: ResultsComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'date-sheets', component: DateSheetsComponent },
    { path: 'model-papers', component: ModelPapersComponent },
    { path: 'results/:boardDomain/:classTitle/:examType/:year', component: ResultDetailPageComponent},
    { path: 'date-sheets/:boardDomain/:classTitle/:examType/:year', component: DateSheetDetailComponent},
    { path: 'model-papers/:boardDomain/:classTitle/:subject', component: ModelPaperDetailComponent},
    { path: '**', redirectTo: '' }
];
