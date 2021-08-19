import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from '@app/app.component';
import { HomeLayoutComponent } from '@app/layouts/home-layout/home-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '@app/app.routing';
import { ComponentsModule } from '@app/components/components.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AlertModule, AlertService } from 'ngx-alerts';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {PageNotFoundComponent, HowItWorksComponent, HowToDoComponent, BoardsComponent} from '@app/pages';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    NgbModule,
    FormsModule,
    RouterModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    LoadingBarModule,
    AlertModule.forRoot(),
    LoadingBarHttpModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LottieModule.forRoot({player: playerFactory, useCache: true}),
    LoadingBarHttpClientModule,
    NgxDocViewerModule
  ],
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    PageNotFoundComponent,
    HowItWorksComponent,
    HowToDoComponent,
    BoardsComponent
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
