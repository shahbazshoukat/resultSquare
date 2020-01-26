import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { AuthGuard } from './guards/auth.guard';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent},
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/home-layout/home-layout.module#HomeLayoutModule'
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  exports: [
  ],
})
export class AppRoutingModule { }
