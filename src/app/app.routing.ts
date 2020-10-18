import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '@app/layouts/home-layout/home-layout.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { PageNotFoundComponent } from '@app/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent},
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@app/layouts/home-layout/home-layout.module').then(m => m.HomeLayoutModule)
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
