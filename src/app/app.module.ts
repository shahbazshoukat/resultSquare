import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpErrorInterceptor } from '@app/interceptors/http-error.interceptor';
import { AuthInterceptor } from '@app/interceptors/auth-interceptor';
import { AppComponent } from '@app/app.component';
import { HomeLayoutComponent } from '@app/layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from '@app/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@app/layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '@app/app.routing';
import { ComponentsModule } from '@app/components/components.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AlertModule, AlertService } from 'ngx-alerts';
import { PageNotFoundComponent } from '@app/pages/page-not-found/page-not-found.component';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    AdminLayoutComponent,
    AuthLayoutComponent,
    PageNotFoundComponent
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
