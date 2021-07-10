import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeLayoutRoutes } from '@app/layouts/home-layout/home-layout.routing';
import { HomeComponent,
  ResultPageComponent,
  BoardsListComponent,
  BoardResultsComponent,
  LatestResultsComponent,
  DetailPageComponent,
  DateSheetDetailComponent,
  LatestPageComponent,
  LatestDateSheetsComponent,
  BoardPageComponent,
  BoardDateSheetsComponent,
  FilterPanelComponent,
  ResultsComponent,
  DateSheetsComponent,
  ModelPapersComponent,
  BoardsComponent,
  HomePageComponent,
  ModelPaperDetailComponent
} from '@app/pages';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '@app/pipes';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ComponentsModule } from '@app/components/components.module';
export function playerFactory() { return player; }

@NgModule({
    imports: [
        NgbModule,
        FormsModule,
        CommonModule,
        NgxPrintModule,
        HttpClientModule,
        NgxPaginationModule,
        RouterModule.forChild(HomeLayoutRoutes),
        LottieModule.forRoot({player: playerFactory, useCache: true}),
        LoadingBarModule,
        NgxDocViewerModule,
        ComponentsModule
    ],
    exports: [
        FilterPanelComponent
    ],
    declarations: [
        SafePipe,
        HomeComponent,
        ResultPageComponent,
        BoardsListComponent,
        BoardResultsComponent,
        LatestResultsComponent,
        DetailPageComponent,
        DateSheetDetailComponent,
        LatestPageComponent,
        LatestDateSheetsComponent,
        BoardPageComponent,
        BoardDateSheetsComponent,
        FilterPanelComponent,
        ResultsComponent,
        DateSheetsComponent,
        ModelPapersComponent,
        BoardsComponent,
        HomePageComponent,
        ModelPaperDetailComponent
    ]
})

export class HomeLayoutModule {}
