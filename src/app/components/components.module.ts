import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }
