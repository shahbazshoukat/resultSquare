
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/admin/login/login.component';
import { RegisterComponent } from '../../pages/admin/register/register.component';
import { AlertModule, AlertService } from 'ngx-alerts';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    AlertModule.forRoot({maxMessages: 5, timeout: 3000, position: 'right'})
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AlertService
  ]
})
export class AuthLayoutModule { }
