import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeLayoutRoutes } from '@app/layouts/home-layout/home-layout.routing';

import {
  HomeComponent,
  EnterRollNoComponent
} from '@app/pages';

import { NgxPaginationModule } from 'ngx-pagination';

import { NgxPrintModule } from 'ngx-print';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from '@app/pipes';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    NgxPrintModule,
    NgxPaginationModule
  ],
  declarations: [
    HomeComponent,
    EnterRollNoComponent,
    SafePipe
  ]
})

export class HomeLayoutModule {}
