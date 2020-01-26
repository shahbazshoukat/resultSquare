import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth-interceptor';


import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AlertModule, AlertService } from 'ngx-alerts';
export function playerFactory() {
  return player;
}

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        RouterModule,
        AppRoutingModule,
        LottieModule.forRoot({player: playerFactory, useCache: true}),
        AlertModule.forRoot()
    ],
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    PageNotFoundComponent,
  ],
  providers: [
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
