import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '@app/layouts/home-layout/home-layout.component';
import { AdminLayoutComponent } from '@app/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@app/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { PageNotFoundComponent } from '@app/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent},
  {
    path: 'rs-admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: 'secret-rs-admin',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
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
