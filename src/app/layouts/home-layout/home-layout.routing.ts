import { Routes } from '@angular/router';

import {
  HomeComponent,
  DetailPageComponent,
  HomePageComponent,
  ResultsComponent,
  DateSheetsComponent,
  ModelPapersComponent,
  BoardsComponent, DateSheetDetailComponent, ModelPaperDetailComponent
} from '@app/pages';

export const HomeLayoutRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'date-sheets', component: DateSheetsComponent },
    { path: 'model-papers', component: ModelPapersComponent },
    { path: 'past-papers', component: HomeComponent },
    { path: 'boards', component: BoardsComponent },
    { path: 'results/:classTitle/:examType/:year', component: DetailPageComponent},
    { path: 'date-sheets/:pageId', component: DateSheetDetailComponent},
    { path: 'model-papers/:sectionId/:subject', component: ModelPaperDetailComponent},
    { path: '**', redirectTo: '' }
];
