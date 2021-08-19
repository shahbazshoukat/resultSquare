import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from '@app/layouts/home-layout/home-layout.component';
import { PageNotFoundComponent, HowToDoComponent, BoardsComponent } from '@app/pages';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent},
  // { path: 'how-to-find-results', component: HowToDoComponent},
  { path: 'educational-boards', component: BoardsComponent},
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
  exports: []
})
export class AppRoutingModule { }
